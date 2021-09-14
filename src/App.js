import { Route, Switch, useHistory } from "react-router";

import Layout from "./components/layouts/Layout";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import AuthContext from "./store/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./UI/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  function loginUserHandler(userData) {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URI}/api/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          setIsLoading(false);
          sessionStorage.setItem("username", data.username);
          localStorage.setItem("isLoggedIn", "1");
          setIsLoggedIn(true);
          history.replace("/dashboard");
        } else {
          setIsLoading(false);
          setIsLoggedIn(false);
          history.replace("/");
          toast.error("Wrong Username or Password");
        }
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  const logoutHandler = () => {
    sessionStorage.clear();
    localStorage.removeItem("isLoggedIn");
    history.replace("/");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <Layout>
        <ToastContainer />
        <Switch>
          {!isLoggedIn && (
            <Route path="/" exact>
              <LoginPage onLogin={loginUserHandler} />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/register">
              <RegistrationPage />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/changePassword">
              <ChangePassword />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/forgot">
              <ResetPasswordRequest />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/reset_password/:token" component={ResetPassword} />
          )}
        </Switch>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
