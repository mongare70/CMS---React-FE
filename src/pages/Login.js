import LoginForm from "../components/forms/login/LoginForm";
import { Fragment } from "react";
const Login = (props) => {
  return (
    <Fragment>
      <LoginForm onLoginUser={props.onLogin} />
    </Fragment>
  );
};

export default Login;
