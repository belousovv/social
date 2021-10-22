import React from "react";
import { connect } from "react-redux";
import Login from "../Login/Login";
import Success from "../Success/Success";
import { auth } from "../../../redux/auth-selectors";
import { TRootState } from "../../../redux/store";

const LoginOrSuccess: React.FC<TMstp> = (props) => {
  return <>{props.isAuth ? <Success /> : <Login />}</>;
};

const mapStateToProps = (state: TRootState) => ({
  isAuth: auth(state),
});

export default connect<TMstp, {}, {}, TRootState>(mapStateToProps, {})(LoginOrSuccess);

// Types

type TMstp = {
  isAuth: boolean;
}
