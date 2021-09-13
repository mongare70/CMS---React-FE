import classes from "./MainNavigation.module.css";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useContext } from "react";
import AuthContext from "../../store/AuthContext";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const loggedInUser = sessionStorage.getItem("username");

  return (
    <Fragment>
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
                <button className={classes.cta} onClick={ctx.onLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default MainNavigation;
