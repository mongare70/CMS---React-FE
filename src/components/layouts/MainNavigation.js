import classes from "./MainNavigation.module.css";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function MainNavigation() {
  const history = useHistory();

  function logOutHandler() {
    sessionStorage.clear();
    history.replace("/");
    alert("Logged out successfully!");
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>CMS</div>
      <nav>
        <ul className={classes.nav__links}>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <button className={classes.cta} onClick={logOutHandler}>
        Log out
      </button>
    </header>
  );
}

export default MainNavigation;
