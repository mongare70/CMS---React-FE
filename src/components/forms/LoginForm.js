import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import validate from "./ValidateLoginForm";
import classes from "./LoginForm.module.css";

function LoginForm(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function submitHandler(event) {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  }

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const enteredUsername = usernameInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const userData = {
        username: enteredUsername,
        password: enteredPassword,
      };

      props.onLoginUser(userData);
    }
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Log In</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            ref={usernameInputRef}
          />
          <div className={classes.errors}>
            {errors.username && <p>{errors.username}</p>}
          </div>
        </div>
        <div className={classes.control}>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            ref={passwordInputRef}
          />
          <div className={classes.errors}>
            {errors.password && <p>{errors.password}</p>}
          </div>
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
        <div className={classes.doyou}>
          <label>
            <Link to="#">Forgot password?</Link>
          </label>
        </div>
        <div className={classes.actions2}>
          <button>
            <Link to="/register">Register New Account</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
