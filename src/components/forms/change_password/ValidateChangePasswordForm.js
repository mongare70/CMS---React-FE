export default function ValidateChangePasswordForm(values) {
  let errors = {};

  if (!values.oldPassword.trim()) {
    errors.oldPassword = "Old Password is required";
  }

  if (!values.newPassword) {
    errors.newPassword = "New Password is required";
  }

  return errors;
}
