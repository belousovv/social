import React from "react";
import styles from "./Message.module.css";

const Message: React.FC<TProps> = ({ img, name, text }) => {
  return (
    <div className={styles.message}>
      <img className={styles.img} src={img} alt="avatar" />
      <div className={styles.content}>
        <h6 className={styles.name}>{name}</h6>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Message;

// Types

type TProps = {
  img: string;
  name: string;
  text: string;
}