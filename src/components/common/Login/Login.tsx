import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth-reducer";
import { selectCaptcha } from "../../../redux/auth-selectors";
import styles from "./Login.module.css";

const Login: React.FC = (props) => {
  const dispatch = useDispatch();
  const captcha = useSelector(selectCaptcha);

  const { register, watch, handleSubmit } = useForm();
  const onSubmit = () => {
    const data = {
      email: watch("email"),
      password: watch("password"),
      rememberMe: true,
      captcha: watch("captcha"),
    };
    dispatch(login(data.email, data.password, data.rememberMe, data.captcha));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        type="email"
        {...register("email")}
        placeholder="email"
      />
      <input
        className={styles.input}
        type="password"
        {...register("password")}
        placeholder="password"
      />
      {captcha && (
        <>
          <img className={styles.captchaImg} src={captcha} alt="captcha" />
          <input
            className={styles.input}
            type="text"
            {...register("captcha")}
            placeholder="captcha"
          />
        </>
      )}
      <button className={styles.btn} type="submit">
        login
      </button>
      <div className={styles.note}>
        <h6 className={styles.title}>for test:</h6>
        <p className={styles.text}>Email: <b>free@samuraijs.com</b></p>
        <p className={styles.text}>Password: <b>free</b></p>
      </div>
    </form>
  );
};

export default Login;
