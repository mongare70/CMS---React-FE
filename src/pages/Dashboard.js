import { useState, useEffect } from "react";
import UserDashboard from "../components/layouts/UserDashboard";

import Login from "./Login";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/getsession", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          setIsLoading(false);
          setIsLoggedIn(true);
        }
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (isLoggedIn) {
    return <UserDashboard />;
  } else {
    return <Login />;
  }
}

export default Dashboard;
