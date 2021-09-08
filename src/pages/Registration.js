import { Fragment } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NewAccountForm from "../components/forms/create_account/NewAccountForm";

const Registration = () => {
  const history = useHistory();

  function addUserHandler(userData) {
    fetch(`${process.env.REACT_APP_API_URI}/api/createUser`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.registered === true) {
          history.replace("/");
          toast.success("Account created Successfully!");
        } else if (data.username === false) {
          toast.error("User with submitted username already exists");
        } else if (data.email === false) {
          toast.error("User with submitted email already exists");
        }
      });
  }

  return (
    <Fragment>
      <NewAccountForm onAddUser={addUserHandler} />
    </Fragment>
  );
};

export default Registration;
