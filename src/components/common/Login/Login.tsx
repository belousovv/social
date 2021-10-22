import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { login } from "../../../redux/auth-reducer";
import { captcha } from "../../../redux/auth-selectors";
import { TRootState } from "../../../redux/store";
import styles from "./Login.module.css";

const Login: React.FC<TProps> = (props) => {
  const { register, watch, handleSubmit } = useForm();
  const onSubmit = () => {
    const data = {
      email: watch("email"),
      password: watch("password"),
      rememberMe: true,
      captcha: watch("captcha"),
    };
    props.login(data.email, data.password, data.rememberMe, data.captcha);
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
      {props.captcha && (
        <>
          <img
            className={styles.captchaImg}
            src={props.captcha}
            alt="captcha"
          />
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
    </form>
  );
};
const mapStateToProps = (state: TRootState) => ({
  captcha: captcha(state),
});
export default connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, { login })(Login);

// Types

type TMstp = {
  captcha: string;
}

type TMdtp = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
}

type TProps = TMstp & TMdtp;