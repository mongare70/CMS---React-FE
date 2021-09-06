import { useState, useEffect, Fragment } from "react";
import UserDashboard from "../components/layouts/UserDashboard";

import Login from "./Login";

const Dashboard = () => {
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
      <Fragment>
        <p>Loading...</p>
      </Fragment>
    );
  }

  if (isLoggedIn) {
    return <UserDashboard />;
  } else {
    return <Login />;
  }
};

export default Dashboard;
