import { Fragment } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainNavigation from "../components/layouts/MainNavigation";
import ChangePasswordForm from "../components/forms/change_password/ChangePasswordForm";

const ChangePassword = () => {
  const history = useHistory();

  const changeUserPasswordHandler = (newUserPassword) => {
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
          history.replace("/dashboard");
          toast.success("Password Updated successfully!");
        } else if (data.password === false) {
          toast.error("Incorrect Old Password!");
        }
      });
  };

  return (
    <Fragment>
      <MainNavigation />
      <ChangePasswordForm onChangeUserPassword={changeUserPasswordHandler} />
    </Fragment>
  );
};

export default ChangePassword;
