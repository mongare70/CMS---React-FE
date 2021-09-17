import ResetPasswordRequestForm from "../components/forms/reset_password/ResetPasswordRequestForm";
import PleaseCheckYourEmail from "./PleaseCheckYourEmail";

import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader";

const ResetPasswordRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const resetPasswordEmailHandler = async (email) => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/reset_password`,
      {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const data = await response.json();

    console.log(data);
    if (data.reset === false) {
      setIsLoading(false);
      toast.error("Email does not exist");
    } else if (data.password_reset === true) {
      setIsLoading(false);
      setPasswordReset(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
