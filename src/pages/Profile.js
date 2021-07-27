import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProfileForm from "../components/forms/profile/ProfileForm";
import MainNavigation from "../components/layouts/MainNavigation";
import Login from "./Login";

function Profile() {
  const history = useHistory();

  function changeUserDataHandler(newUserData) {
    fetch("/api/editUser", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        history.replace("/dashboard");
        alert("Profile edited successfully!");
      });
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/api/getsession", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          setIsLoggedIn(true);
          if (data.username != null) {
            setUsername(data.username);
          }
        }
      });
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <section>
          <MainNavigation />
          <ProfileForm
            usernameHandler={username}
            onChangeUserData={changeUserDataHandler}
          />
        </section>
      </div>
    );
  } else {
    return <Login />;
  }
}

export default Profile;
