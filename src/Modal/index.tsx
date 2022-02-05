import classes from "./modal.module.scss";
import { Countdown } from "~src/Countdown";
import { Share } from "~src/Share";

  const state = useContext(State);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>Next Game In:</div>
          <Countdown />
      </div>
    </div>
  );
};
