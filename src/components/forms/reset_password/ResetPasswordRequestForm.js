import classes from "./ResetPasswordRequestForm.module.css";
import validate from "./ValidateResetPasswordRequestForm";

import { useState, useEffect, useRef } from "react";

const ResetPasswordRequestForm = (props) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({
    email: "",
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

  const emailInputRef = useRef();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const enteredEmail = emailInputRef.current.value;

      const email = enteredEmail;

      props.onResetPasswordEmail(email);
      setValues({
        email: "",
      });
    }
  }, [errors, isSubmitting, props]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Reset Password</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email here"
            value={values.email}
            onChange={handleChange}
            ref={emailInputRef}
          />
          <div className={classes.errors}>
            {errors.email && <p>{errors.email}</p>}
          </div>
        </div>
        <div className={classes.actions}>
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordRequestForm;
