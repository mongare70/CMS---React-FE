import { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainNavigation from "../components/layouts/MainNavigation";
import ChangePasswordForm from "../components/forms/change_password/ChangePasswordForm";
import Loader from "../UI/Loader";

const ChangePassword = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const changeUserPasswordHandler = async (newUserPassword) => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/editUserPassword`,
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
    if (data.editUserPassword === true) {
      setIsLoading(false);
      history.replace("/profile");
      toast.success("Password Updated successfully!");
    } else if (data.password === false) {
      setIsLoading(false);
      toast.error("Incorrect Old Password!");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MainNavigation />
      <ChangePasswordForm onChangeUserPassword={changeUserPasswordHandler} />
    </Fragment>
  );
};

export default ChangePassword;
