import ResetPasswordRequestForm from "../components/forms/reset_password/ResetPasswordRequestForm";
import PleaseCheckYourEmail from "./PleaseCheckYourEmail";

import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordRequest = () => {
  const [passwordReset, setPasswordReset] = useState(false);

  const resetPasswordEmailHandler = (email) => {
    fetch(`${process.env.REACT_APP_API_URI}/api/reset_password`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.reset === false) {
          toast.error("Email does not exist");
        } else if (data.password_reset === true) {
          setPasswordReset(true);
        }
      });
  };

  if (passwordReset) {
    return (
      <Fragment>
        <PleaseCheckYourEmail />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <ResetPasswordRequestForm
          onResetPasswordEmail={resetPasswordEmailHandler}
        />
      </Fragment>
    );
  }
};

export default ResetPasswordRequest;
