import { Route, Switch } from "react-router";

import Layout from "./components/layouts/Layout";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
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
      </Switch>
    </Layout>
  );
}

export default App;
