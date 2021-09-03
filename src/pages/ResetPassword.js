import ResetPasswordForm from "../components/forms/reset_password/ResetPasswordForm";

import { useHistory } from "react-router";
import { useParams } from "react-router";

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
          alert("Password changed! Please login!");
        } else {
          alert("That is an invalid or expired token. Please try again.");
        }
      });
  };

  return (
    <div>
      <ResetPasswordForm onResetPassword={onResetPasswordHandler} />;
    </div>
  );
};

export default ResetPassword;
