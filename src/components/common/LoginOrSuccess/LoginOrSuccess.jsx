import React from "react";
import { connect } from "react-redux";
import Login from "../Login/Login";
import Success from "../Success/Success";
import { auth } from "../../../redux/auth-selectors";

const LoginOrSuccess = (props) => {
  return <>{props.isAuth ? <Success /> : <Login />}</>;
};

const mapStateToProps = (state) => ({
  isAuth: auth(state),
});

export default connect(mapStateToProps, null)(LoginOrSuccess);
