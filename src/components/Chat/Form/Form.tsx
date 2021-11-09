import styles from "./Form.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../redux/chat-reducer";
import { selectStatus } from "../../../redux/chat-selectors";

const Form: React.FC = () => {
  const channelStatus = useSelector(selectStatus);

  const dispatch = useDispatch();

  const { register, handleSubmit, watch, reset } = useForm();

  const sendHandler = () => {
    dispatch(sendMessage(watch("textarea")));
    reset({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(sendHandler)}>
      <textarea
        className={styles.textarea}
        placeholder="enter message"
        {...register("textarea")}
      />
      <button
        className={styles.btn}
        type="submit"
        disabled={channelStatus === "pending"}
      >
        SEND
      </button>
    </form>
  );
};

export default Form;
