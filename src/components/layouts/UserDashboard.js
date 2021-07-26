import MainNavigation from "./MainNavigation";

function UserDashboard(props) {
  return (
    <div>
      <MainNavigation />
      <h1>User Dashboard</h1>
      {props.children}
    </div>
  );
}

export default UserDashboard;
