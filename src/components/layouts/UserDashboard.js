import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const UserDashboard = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <h1>User Dashboard</h1>
      {props.children}
    </Fragment>
  );
};

export default UserDashboard;
