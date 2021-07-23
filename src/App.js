import { Route, Switch } from "react-router";

import Layout from "./components/layouts/Layout";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import HomePage from "./pages/Home";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/register">
          <RegistrationPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
