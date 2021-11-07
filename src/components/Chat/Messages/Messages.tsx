import styles from "./Messages.module.css";
import React from "react";
import Message from "./Message/Message";
import { TChatMessage } from "../../../api/chat-api";

const Messages: React.FC<TProps> = ({ messages }) => {
  return (
    <div className={styles.messages}>
      {messages?.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

export default Messages;

// Types

type TProps = {
  messages: TChatMessage[] | null;
};
