import classes from "./ProfileForm.module.css";
// import validate from "./ValidateProfileForm";

// import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function ProfileForm() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const firstnameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler() {}

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Profile</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
            ref={firstnameInputRef}
          />
          <div className={classes.errors}>
            {errors.firstname && <p>{errors.firstname}</p>}
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
            ref={usernameInputRef}
          />
          <div className={classes.errors}>
            {errors.lastname && <p>{errors.lastname}</p>}
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
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
          <button type="submit">Update Profile</button>
        </div>
      </form>
      <div className={classes.doyou}>
        <button>Delete Account</button>
      </div>
    </div>
  );
}

export default ProfileForm;
