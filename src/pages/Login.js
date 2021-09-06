import LoginForm from "../components/forms/login/LoginForm";
import { useHistory } from "react-router";
import { Fragment, useEffect, useState } from "react";
import UserDashboard from "../components/layouts/UserDashboard";

const Login = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loginUserHandler(userData) {
    fetch(`${process.env.REACT_APP_API_URI}/api/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          sessionStorage.setItem("username", data.username);
          history.replace("/dashboard");
        } else {
          history.replace("/");
          alert("Wrong Username or Password");
        }
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const loggedInUser = sessionStorage.getItem("username");

    if (loggedInUser !== null) {
      setIsLoading(false);
      setIsLoggedIn(true);
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Fragment>
        <p>Loading...</p>
      </Fragment>
    );
  }

  if (isLoggedIn) {
    return <UserDashboard />;
  } else {
    return (
      <Fragment>
        <LoginForm onLoginUser={loginUserHandler} />
      </Fragment>
    );
  }
};

export default Login;
