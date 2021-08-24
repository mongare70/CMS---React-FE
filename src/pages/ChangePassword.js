import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import MainNavigation from "../components/layouts/MainNavigation";
import Login from "./Login";
import ChangePasswordForm from "../components/forms/change_password/ChangePasswordForm";

function ChangePassword() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function changeUserPasswordHandler(newUserPassword) {
    fetch(`${process.env.REACT_APP_API_URI}/api/editUserPassword`, {
      method: "POST",
      body: JSON.stringify(newUserPassword),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.editUserPassword === true) {
          history.replace("/dashboard");
          alert("Password Updated successfully!");
        } else if (data.password === false) {
          alert("Incorrect Password!");
        }
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const loggedInUser = sessionStorage.getItem("username");

    if (loggedInUser !== null) {
      setIsLoading(false);
      setIsLoggedIn(true);
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (isLoggedIn) {
    return (
      <div>
        <section>
          <MainNavigation />
          <ChangePasswordForm
            onChangeUserPassword={changeUserPasswordHandler}
          />
        </section>
      </div>
    );
  } else {
    return <Login />;
  }
}

export default ChangePassword;
