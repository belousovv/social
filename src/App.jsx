import { Redirect, Switch } from "react-router";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route } from "react-router";
import Profile from "./components/Profile/Profile";
import { useEffect } from "react";
import { startInitialize } from "./redux/app-reducer";
import { connect } from "react-redux";
import { getInitialized } from "./redux/app-selectors";
import Preloader from "./components/common/Preloader/Preloader";
import Dialogs from "./components/Dialogs/Dialogs";

const App = (props) => {
  useEffect(() => {
    props.startInitialize();
  }, []);
  if (props.isInitialize) {
    return (
      <div className={styles.app}>
        <Sidebar />
        <main className={styles.main}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile" />} />
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/messages" render={() => <Dialogs />} />
          </Switch>
        </main>
      </div>
    );
  } else {
    return <Preloader />
  }
};

const mapStateToProps = (state) => ({
  isInitialize: getInitialized(state),
});
export default connect(mapStateToProps, { startInitialize })(App);
