import React from "react";
import styles from "./Contact.module.css";
import defaultAvatar from "../../../img/default-avatar.png";

const Contact = (props) => {
  return (
    <div className={styles.contact}>
      <div className={styles.content}>
        <img
          className={styles.img}
          src={props.img || defaultAvatar}
          alt="avatar"
        />
        <div className={styles.text}>
          <h6 className={styles.name}>{props.name}</h6>
          <p className={styles.status}>{props.status}</p>
        </div>
      </div>
      {props.followed ? (
        <span className={styles.follow}>followed</span>
      ) : (
        <span className={styles.unfollow}>unfollowed</span>
      )}
    </div>
  );
};

export default Contact;
