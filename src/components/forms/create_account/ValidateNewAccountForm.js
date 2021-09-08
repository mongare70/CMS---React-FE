export default function ValidateNewAccountForm(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Username required";
  } else if (
    !/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
      values.username
    )
  ) {
    errors.username = "Username is invalid: e.g mama";
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
