import { Fragment, useState } from "react";
import { useHistory } from "react-router";
import ProfileForm from "../components/forms/profile/ProfileForm";
import MainNavigation from "../components/layouts/MainNavigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader";

const Profile = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const changeUserDataHandler = async (newUserData) => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/editUser`,
      {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const data = await response.json();

    console.log(data);
    if (data.editUser === true) {
      setIsLoading(false);
      history.replace("/profile");
      toast.success("Profile edited successfully!");
    } else if (data.password === false) {
      setIsLoading(false);
      toast.error("Incorrect Password!");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MainNavigation />
      <ProfileForm onChangeUserData={changeUserDataHandler} />
    </Fragment>
  );
};

export default Profile;
