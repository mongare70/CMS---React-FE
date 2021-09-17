import { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../UI/Loader";
import NewAccountForm from "../components/forms/create_account/NewAccountForm";

const Registration = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const addUserHandler = async (userData) => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/createUser`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const data = await response.json();

    console.log(data);
    if (data.registered === true) {
      setIsLoading(false);
      history.replace("/");
      toast.success("Account created Successfully!");
    } else if (data.username === false) {
      setIsLoading(false);
      toast.error("User with submitted username already exists");
    } else if (data.email === false) {
      setIsLoading(false);
      toast.error("User with submitted email already exists");
    }
  };

  return (
    <Fragment>
      {isLoading ? <Loader /> : <NewAccountForm onAddUser={addUserHandler} />}
    </Fragment>
  );
};

export default Registration;
