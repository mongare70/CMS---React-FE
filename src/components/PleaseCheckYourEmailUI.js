import classes from "./PleaseCheckYourEmailUI.module.css";

const PleaseCheckYourEmailUI = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Please check your email</h1>
      <p className={classes.content}>The link sent will expire in 5 minutes.</p>
    </div>
  );
};

export default PleaseCheckYourEmailUI;
