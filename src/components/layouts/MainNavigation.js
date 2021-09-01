import classes from "./MainNavigation.module.css";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MainNavigation = () => {
  const history = useHistory();

  const logOutHandler = () => {
    sessionStorage.clear();
    history.replace("/");
    alert("Logged out successfully!");
  };

  const loggedInUser = sessionStorage.getItem("username");

  return (
    <div>
      <nav>
        <div className={classes.logo}>CMS</div>
        <label htmlFor="btn" className={classes.icon}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <input type="checkbox" id="btn" />
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <label htmlFor="btn1" className={classes.show}>
              {loggedInUser}+
            </label>
            <Link to="#">{loggedInUser}</Link>
            <input type="checkbox" id="btn1" />
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className={classes.cta} onClick={logOutHandler}>
                  Log out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
