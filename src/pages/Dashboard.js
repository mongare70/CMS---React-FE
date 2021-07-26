import { useState, useEffect } from "react";
import UserDashboard from "../components/layouts/UserDashboard";

import Login from "./Login";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/getsession", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.login === true) {
          setIsLoggedIn(true);
        }
      });
  }, []);

  if (isLoggedIn) {
    return <UserDashboard />;
  } else {
    return <Login />;
  }
}

export default Dashboard;
