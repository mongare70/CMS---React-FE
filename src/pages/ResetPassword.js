import ResetPasswordForm from "../components/forms/reset_password/ResetPasswordForm";
import Loader from "../UI/Loader";

import { useHistory } from "react-router";
import { useParams } from "react-router";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const history = useHistory();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const onResetPasswordHandler = async (newUserPassword) => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/reset_password_form/${params.token}`,
      {
        method: "POST",
        body: JSON.stringify(newUserPassword),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();

    console.log(data);
    if (data.reset === true) {
      setIsLoading(false);
      history.replace("/");
      toast.success("Password changed successfully! Please login!");
    } else {
      setIsLoading(false);
      toast.error("That is an invalid or expired token. Please try again.");
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <ResetPasswordForm onResetPassword={onResetPasswordHandler} />
      )}
      ;
    </Fragment>
  );
};

export default ResetPassword;
