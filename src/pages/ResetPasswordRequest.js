import ResetPasswordRequestForm from "../components/forms/reset_password/ResetPasswordRequestForm";

import { useState } from "react";
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
      <div>
        <PleaseCheckYourEmail />
      </div>
    );
  } else if (emailExists) {
    return (
      <div>
        <ResetPasswordRequestForm
          onResetPasswordEmail={resetPasswordEmailHandler}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Email does not exist</h1>
        <ResetPasswordRequestForm
          onResetPasswordEmail={resetPasswordEmailHandler}
        />
      </div>
    );
  }
};

export default ResetPasswordRequest;
