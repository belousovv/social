import styles from "./Form.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../redux/chat-reducer";

const Form: React.FC<TProps> = ({ channelStatus }) => {

  const dispatch = useDispatch();

  const { register, handleSubmit, watch, reset } = useForm();

  const sendHandler = () => {
    dispatch(sendMessage(watch("textarea")));
    reset({});
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(sendHandler)}>
      <textarea className={styles.textarea} placeholder="enter message" {...register("textarea")}/>
      <button className={styles.btn} type="submit" disabled={ channelStatus === "pending" ? true : false }>
        SEND
      </button>
    </form>
  );
};

export default Form;

// Types

type TProps = {
	channelStatus: "pending" | "open";
}
