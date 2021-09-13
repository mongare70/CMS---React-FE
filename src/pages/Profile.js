import { Fragment } from "react";
import { useHistory } from "react-router";
import ProfileForm from "../components/forms/profile/ProfileForm";
import MainNavigation from "../components/layouts/MainNavigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.success("Profile edited successfully!");
        } else if (data.password === false) {
          toast.error("Incorrect Password!");
        }
      });
  }

  return (
    <Fragment>
      <MainNavigation />
      <ProfileForm onChangeUserData={changeUserDataHandler} />
    </Fragment>
  );
};

export default Profile;
