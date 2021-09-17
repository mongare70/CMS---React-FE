import classes from "./ChangePasswordForm.module.css";
import validate from "./ValidateChangePasswordForm";

import { useState, useEffect, useRef } from "react";

const ChangePasswordForm = (props) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
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

  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("username");

    if (Object.keys(errors).length === 0 && isSubmitting) {
      const enteredOldPassword = oldPasswordInputRef.current.value;
      const enteredNewPassword = newPasswordInputRef.current.value;

      const newUserPassword = {
        username: loggedInUser,
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      };

      props.onChangeUserPassword(newUserPassword);
      setValues({
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [errors, isSubmitting, props]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Change Password</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleChange}
            ref={oldPasswordInputRef}
          />
          <div className={classes.errors}>
            {errors.oldPassword && <p>{errors.oldPassword}</p>}
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            ref={newPasswordInputRef}
          />
          <div className={classes.errors}>
            {errors.newPassword && <p>{errors.newPassword}</p>}
          </div>
        </div>
        <div className={classes.actions}>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
