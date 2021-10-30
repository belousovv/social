import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import withTime from "../../../hoc/withTime";
import { actions, TMessage } from "../../../redux/dialogs-reducer";
import { TRootState } from "../../../redux/store";
import styles from "./MessageForm.module.css";

const MessageForm: React.FC<TMdtp & TWithTime> = (props) => {
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

const {addMessage} = actions;

export default compose(withTime, connect<null, TMdtp, {}, TRootState>(null, { addMessage }))(MessageForm) as React.ComponentType;

// Types

type TWithTime = {
  getTime: () => number;
}

type TMdtp = {
  addMessage: (message: TMessage) => void
}
