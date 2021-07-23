import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import validate from "./ValidateNewAccountForm";
import classes from "./NewAccountForm.module.css";

function NewAccountForm(props) {
  const [values, setValues] = useState({
    username: "",
    email: "",
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
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const enteredUsername = usernameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const userData = {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      };

      props.onAddUser(userData);
    }
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Create New Account</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            ref={usernameInputRef}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            ref={emailInputRef}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            ref={passwordInputRef}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
        </div>
        <div className={classes.doyou}>
          <label>
            Already have an account? <Link to="/login">Log in</Link>
          </label>
        </div>
      </form>
    </div>
  );
}

export default NewAccountForm;
