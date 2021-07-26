import { useState, useEffect } from "react";
import ProfileForm from "../components/forms/ProfileForm";
import MainNavigation from "../components/layouts/MainNavigation";
import Login from "./Login";

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        }
      });
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <section>
          <MainNavigation />
          <ProfileForm />
        </section>
      </div>
    );
  } else {
    return <Login />;
  }
}

export default Profile;
