import classes from "./ResetPasswordForm.module.css";
import validate from "./ValidateResetPasswordForm";

import { useState, useEffect, useRef } from "react";

const ResetPasswordForm = (props) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({
    newPassword: "",
    confirmNewPassword: "",
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

  const newPasswordInputRef = useRef();

  useEffect(() => {
    const doSomething = (errors, isSubmitting, props) => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        const enteredNewPassword = newPasswordInputRef.current.value;

        const newUserPassword = enteredNewPassword;

        props.onResetPassword(newUserPassword);
        setValues({
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    };

    doSomething(errors, isSubmitting, props);
  }, [errors, isSubmitting, props]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Change Password</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
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
        <div className={classes.control}>
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={values.confirmNewPassword}
            onChange={handleChange}
          />
          <div className={classes.errors}>
            {errors.confirmNewPassword && <p>{errors.confirmNewPassword}</p>}
          </div>
        </div>
        <div className={classes.actions}>
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
