import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "../../redux/auth-selectors";
import styles from "./Dialogs.module.css";
import MessageForm from "./MessageForm/MessageForm";
import Messages from "./Messages/Messages";
import Messangers from "./Messangers/Messangers";

const Dialogs = (props) => {
  if (!props.isAuth) {
    return <Redirect to="/warning" />
  }
  return (
    <div className={styles.dialogs}>
      <div className={styles.wrapper}>
        <MessageForm />
        <Messages />
      </div>
      <Messangers />
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: auth(state),
});
export default connect(mapStateToProps, null)(Dialogs);
