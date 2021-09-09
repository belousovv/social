import React from "react";
import styles from "./Dialogs.module.css";
import MessageForm from "./MessageForm/MessageForm";
import Messages from "./Messages/Messages";
import Contacts from "./Contacts/Contacts";

const Dialogs = () => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.wrapper}>
        <MessageForm />
        <Messages />
      </div>
      <Contacts />
    </div>
  );
};

export default Dialogs;
