export default function ValidateResetPasswordForm(values) {
  let errors = {};

  if (!values.newPassword) {
    errors.newPassword = "New Password is required";
  } else if (values.newPassword.length < 6) {
    errors.newPassword = "New Password needs to be 6 characters or more";
  } else if (values.newPassword.length > 20) {
    errors.newPassword = "New Password needs to be less than 20 characters";
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Confirm New Password is required";
  } else if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword =
      "Confirm New Password should match New Password";
  }

  return errors;
}
