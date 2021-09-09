import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import withTime from "../../../hoc/withTime";
import { addMessage } from "../../../redux/dialogs-reducer";
import styles from "./MessageForm.module.css";

const MessageForm = (props) => {
  const { register, watch, handleSubmit, reset } = useForm();
  const onSubmit = () => {
    props.addMessage({ id: props.getTime(), name: "Vitalic", message: watch("textarea") });
    reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <textarea className={styles.textarea} {...register("textarea")} />
      <button className={styles.btn} type="submit">
        Add message
      </button>
    </form>
  );
};
export default compose(withTime, connect(null, { addMessage }))(MessageForm);
