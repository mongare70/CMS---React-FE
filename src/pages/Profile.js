import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProfileForm from "../components/forms/profile/ProfileForm";
import MainNavigation from "../components/layouts/MainNavigation";
import Login from "./Login";

const Profile = () => {
  const history = useHistory();

  function changeUserDataHandler(newUserData) {
    fetch(`${process.env.REACT_APP_API_URI}/api/editUser`, {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.editUser === true) {
          history.replace("/dashboard");
          alert("Profile edited successfully!");
        } else if (data.password === false) {
          alert("Incorrect Password!");
        }
      });
  }

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <ProfileForm onChangeUserData={changeUserDataHandler} />
        </section>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default Profile;
