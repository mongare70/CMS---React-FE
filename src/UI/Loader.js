import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
