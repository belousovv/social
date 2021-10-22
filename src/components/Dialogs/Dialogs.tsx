import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "../../redux/auth-selectors";
import { TRootState } from "../../redux/store";
import styles from "./Dialogs.module.css";
import MessageForm from "./MessageForm/MessageForm";
import Messages from "./Messages/Messages";
import Messangers from "./Messangers/Messangers";

const Dialogs: React.FC<TMstp> = (props) => {
  if (!props.isAuth) {
    return <Redirect to="/warning" />
  }
  return (
    <div className={styles.dialogs}>
      <div className={styles.wrapper}>
        <MessageForm />
        <Messages />
        <div className={styles.wip}>work in progress</div>
      </div>
      <Messangers />
    </div>
  );
};
const mapStateToProps = (state: TRootState) => ({
  isAuth: auth(state),
});
export default connect<TMstp, {}, {}, TRootState>(mapStateToProps, {})(Dialogs);

// Types

type TMstp = {
  isAuth: boolean;
}
