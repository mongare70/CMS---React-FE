import ResetPasswordForm from "../components/forms/reset_password/ResetPasswordForm";

import { useHistory } from "react-router";
import { useParams } from "react-router";
import { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const history = useHistory();
  const params = useParams();

  const onResetPasswordHandler = (newUserPassword) => {
    fetch(
      `${process.env.REACT_APP_API_URI}/api/reset_password_form/${params.token}`,
      {
        method: "POST",
        body: JSON.stringify(newUserPassword),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.reset === true) {
          history.replace("/");
          toast.success("Password changed successfully! Please login!");
        } else {
          toast.error("That is an invalid or expired token. Please try again.");
        }
      });
  };

  return (
    <Fragment>
      <ResetPasswordForm onResetPassword={onResetPasswordHandler} />;
    </Fragment>
  );
};

export default ResetPassword;
