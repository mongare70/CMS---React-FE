export default function ValidateNewAccountForm(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = "Firstname required";
  }

  if (!values.lastname.trim()) {
    errors.lastname = "Lastname required";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  } else if (values.password.length > 20) {
    errors.password = "Password needs to be less than 20 characters";
  }

  return errors;
}
