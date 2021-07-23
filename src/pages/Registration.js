import { useHistory } from "react-router";

import NewAccountForm from "../components/forms/NewAccountForm";

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
        history.replace("/login");
      });
  }

  return (
    <section>
      <NewAccountForm onAddUser={addUserHandler} />
    </section>
  );
}

export default Registration;
