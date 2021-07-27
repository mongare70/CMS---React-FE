import { useHistory } from "react-router";

import NewAccountForm from "../components/forms/create_account/NewAccountForm";

function Registration() {
  const history = useHistory();

  function addUserHandler(userData) {
    fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((message) => console.log(message))
      .then(() => {
        history.replace("/");
        alert("User created Successfully!");
      });
  }

  return (
    <section>
      <NewAccountForm onAddUser={addUserHandler} />
    </section>
  );
}

export default Registration;
