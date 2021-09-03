import { Route, Switch } from "react-router";

import Layout from "./components/layouts/Layout";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegistrationPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/changePassword">
          <ChangePassword />
        </Route>
        <Route path="/forgot">
          <ResetPasswordRequest />
        </Route>
        <Route path="/reset_password/:token" component={ResetPassword} />
      </Switch>
    </Layout>
  );
};

export default App;
