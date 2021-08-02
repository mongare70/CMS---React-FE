import LoginForm from "../components/forms/login/LoginForm";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import UserDashboard from "../components/layouts/UserDashboard";

function Login() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loginUserHandler(userData) {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          history.replace("/dashboard");
        } else {
          history.replace("/");
          alert("Wrong Username or Password");
        }
      });
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/getsession", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          setIsLoading(false);
          setIsLoggedIn(true);
        } else if (data.login === false) {
          setIsLoading(false);
          setIsLoggedIn(false);
        }
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (isLoggedIn) {
    return <UserDashboard />;
  } else {
    return (
      <section>
        <LoginForm onLoginUser={loginUserHandler} />
      </section>
    );
  }
}

export default Login;
