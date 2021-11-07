import styles from "./Message.module.css";
import React from "react";
import defaultAvatar from "../../../../img/default-avatar.png";
import { TChatMessage } from "../../../../api/chat-api";

const Message: React.FC<TProps> = ({ message }) => {
  return (
    <div className={styles.message}>
      <img className={styles.img} src={message.photo ? message.photo : defaultAvatar} alt="avatar" />
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{message.userName}</h4>
        <p className={styles.text}>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;

// Types

type TProps = {
  message: TChatMessage;
};
