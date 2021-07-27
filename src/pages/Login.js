import LoginForm from "../components/forms/login/LoginForm";
import { useHistory } from "react-router";

function Login() {
  const history = useHistory();

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

  return (
    <section>
      <LoginForm onLoginUser={loginUserHandler} />
    </section>
  );
}

export default Login;
