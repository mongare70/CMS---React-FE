import MainNavigation from "./MainNavigation";

const UserDashboard = (props) => {
  return (
    <div>
      <MainNavigation />
      <h1>User Dashboard</h1>
      {props.children}
    </div>
  );
};

export default UserDashboard;
