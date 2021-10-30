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
import Contacts from "./components/Contacts/Contacts";
import LoginWarning from "./components/LoginWarning/LoginWarning";
import Page404 from "./components/Page404/Page404";
import { TRootState } from "./redux/store";
import LoginPage from "./components/LoginPage/LoginPage";

const App: React.FC<TProps> = (props) => {

  useEffect(() => {
    props.startInitialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (props.isInitialized) {
    return (
      <div className={styles.app}>
        <Sidebar />
        <main className={styles.main}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/profile/:userId?" render={() => <Profile />} />
            <Route path="/messages" render={() => <Dialogs />} />
            <Route path="/contacts" render={() => <Contacts />} />
            <Route path="/warning" render={() => <LoginWarning />} />
            <Route path="*" render={() => <Page404 />} />
          </Switch>
        </main>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

const mapStateToProps = (state: TRootState) => ({
  isInitialized: getInitialized(state),
});
export default connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, { startInitialize })(App);

// Types 

type TProps = TMstp & TMdtp

type TMstp = {
  isInitialized: boolean;
}

type TMdtp = {
  startInitialize: () => void
}
