import styles from "./Chat.module.css";
import img from "../../img/chat.svg";
import React, { useState, useEffect } from "react";
import Messages from "./Messages/Messages";
import Form from "./Form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  startListenMessages,
  stopListenMessages,
} from "../../redux/chat-reducer";
import { selectMessages } from "../../redux/chat-selectors";

const Chat: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startListenMessages());
    return () => {
      dispatch(stopListenMessages());
    };
  }, []);

  const clickHandler = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={styles.chatWrapper}>
      {isActive && (
        <div className={styles.chat}>
          <div className={styles.header}>
            <p className={styles.title}>Welcome to Chat</p>
          </div>
          <Messages messages={messages} />
          <Form />
        </div>
      )}
      <div
        className={styles.fab}
        onClick={clickHandler}
        style={{ backgroundColor: isActive ? "rgb(99, 146, 81)" : "#afbdc4" }}
      >
        <img className={styles.img} src={img} alt="chat" />
      </div>
    </div>
  );
};

export default Chat;

// Types
