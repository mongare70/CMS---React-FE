import ResetPasswordRequestForm from "../components/forms/reset_password/ResetPasswordRequestForm";

import { Fragment, useState } from "react";
import PleaseCheckYourEmail from "./PleaseCheckYourEmail";

const ResetPasswordRequest = () => {
  const [emailExists, setEmailExists] = useState(true);
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
          setEmailExists(false);
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
  } else if (emailExists) {
    return (
      <Fragment>
        <ResetPasswordRequestForm
          onResetPasswordEmail={resetPasswordEmailHandler}
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1>Email does not exist</h1>
        <ResetPasswordRequestForm
          onResetPasswordEmail={resetPasswordEmailHandler}
        />
      </Fragment>
    );
  }
};

export default ResetPasswordRequest;
