import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import validate from "./ValidateNewAccountForm";
import classes from "./NewAccountForm.module.css";

const NewAccountForm = (props) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const login = (errors, isSubmitting, props) => {
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

        setValues({
          username: "",
          email: "",
          password: "",
        });
      }
    };

    login(errors, isSubmitting, props);
  }, [errors, isSubmitting, props]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Create New Account</h1>
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
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            ref={emailInputRef}
          />
          <div className={classes.errors}>
            {errors.email && <p>{errors.email}</p>}
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
          <button type="submit">Register</button>
        </div>
        <div className={classes.doyou}>
          <label>
            Already have an account? <Link to="/">Log in</Link>
          </label>
        </div>
      </form>
    </div>
  );
};

export default NewAccountForm;
