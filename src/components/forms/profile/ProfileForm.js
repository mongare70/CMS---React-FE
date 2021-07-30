import classes from "./ProfileForm.module.css";
import validate from "./ValidateProfileForm";
import Backdrop from "../../delete/Backdrop";
import Modal from "../../delete/Modal";

import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

function ProfileForm(props) {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteAccountHandler() {
    setModalIsOpen(true);
  }

  function deleteAccount() {
    fetch("/api/deleteUser", {
      method: "POST",
      body: JSON.stringify(props.usernameHandler),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        history.replace("/");
        alert("Account deleted successfully!");
      });
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
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
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    function doSomething(errors, isSubmitting, props) {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        const enteredFirstName = firstnameInputRef.current.value;
        const enteredLastName = lastnameInputRef.current.value;
        const displayedUsername = usernameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const newUserData = {
          firstname: enteredFirstName,
          lastname: enteredLastName,
          username: displayedUsername,
          email: enteredEmail,
          password: enteredPassword,
        };

        props.onChangeUserData(newUserData);
        setValues({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
      }
    }
    doSomething(errors, isSubmitting, props);
  }, [errors, isSubmitting, props]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    function getUserDataHandler(username) {
      fetch("/api/getUserData", {
        method: "POST",
        body: JSON.stringify(username),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setUsername(data.username);
          setEmail(data.email);
        });
    }

    getUserDataHandler(props.usernameHandler);
  }, [props.usernameHandler]);

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
            placeholder={firstname}
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
            placeholder={lastname}
            value={values.lastname}
            onChange={handleChange}
            ref={lastnameInputRef}
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
            placeholder={username}
            value={props.usernameHandler}
            ref={usernameInputRef}
            disabled
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={email}
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
        <button onClick={deleteAccountHandler}>Delete Account</button>
      </div>
      {/* Open Modal and Backdrop if modalIsOpen is true */}
      {modalIsOpen ? (
        <Modal onCancel={closeModalHandler} onConfirm={deleteAccount} />
      ) : null}
      {modalIsOpen ? <Backdrop onClick={closeModalHandler} /> : null}
    </div>
  );
}

export default ProfileForm;
