import { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainNavigation from "../components/layouts/MainNavigation";
import Login from "./Login";
import ChangePasswordForm from "../components/forms/change_password/ChangePasswordForm";

const ChangePassword = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeUserPasswordHandler = (newUserPassword) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URI}/api/editUserPassword`, {
      method: "POST",
      body: JSON.stringify(newUserPassword),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.editUserPassword === true) {
          setIsLoading(false);
          history.replace("/dashboard");
          toast.success("Password Updated successfully!");
        } else if (data.password === false) {
          setIsLoading(false);
          toast.error("Incorrect Old Password!");
        }
      });
  };

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
    return (
      <Fragment>
        <section>
          <MainNavigation />
          <ChangePasswordForm
            onChangeUserPassword={changeUserPasswordHandler}
          />
        </section>
      </Fragment>
    );
  } else {
    return <Login />;
  }
};

export default ChangePassword;
