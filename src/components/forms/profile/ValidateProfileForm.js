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
  }

  return errors;
}
