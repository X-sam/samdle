import classes from "./modal.module.scss";
import { Countdown } from "~src/Countdown";
import { Share } from "~src/Share";

export const Modal = ({ ...props }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>Next Game In:</div>
        <Countdown {...props} />
      </div>
    </div>
  );
};
