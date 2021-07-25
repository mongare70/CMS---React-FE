import { useState, useEffect } from "react";
import { useHistory } from "react-router";

function Dashboard() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/getsession", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // if (data.login === true) {
        //   setIsLoggedIn(true);
        // }
      });
  }, []);

  // if (isLoggedIn) {
  //   return (
  //     <section>
  //       <p>Dashboard is Active</p>
  //     </section>
  //   );
  // }

  function logOutHandler() {
    fetch("/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.logout === true) {
          history.replace("/login");
        }
      });
  }

  return (
    <div>
      <section>
        <button onClick={logOutHandler}>Log out</button>
      </section>
    </div>
  );
}

export default Dashboard;
