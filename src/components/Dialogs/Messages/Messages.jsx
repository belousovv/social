import React from "react";
import Message from "./Message/Message";
import styles from "./Messages.module.css";
import avatarDefault from "../../../img/default-avatar.png";
import { connect } from "react-redux";
import { getMessages } from "../../../redux/dialogs-selectors";

const Messages = (props) => {
  return (
    <div className={styles.messages}>
      {props.messages.map((el) => (
        <Message
          key={el.id}
          img={avatarDefault}
          name={el.name}
          text={el.message}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: getMessages(state),
});
export default connect(mapStateToProps, null)(Messages);
