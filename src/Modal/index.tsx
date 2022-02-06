import { useContext } from "react";
import classes from "./modal.module.scss";
import { Countdown } from "~src/Countdown";
import { Share } from "~src/Share";
import { Stats } from "~src/Stats";
import { State } from "~src/state";
import { pick, nativeMath } from "random-js";

export const Modal = () => {
  const state = useContext(State);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div>{pick(nativeMath, TitleOptions)}</div>
          <button
            className={classes.close}
            onClick={() => {
              state.setState({ ...state, showModal: false });
            }}
          >
            X
          </button>
        </div>
        <Stats />
        <div className={classes.next}>
          <div>Next Game In:</div>
          <Countdown />
        </div>
        <Share />
      </div>
    </div>
  );
};

const TitleOptions = [
  "Samdle!",
  "Statistics and More!",
  "SaMain SaMenu",
  "Samdle?",
  "Samdle!!!!!",
  "Samdle¡",
  "Samdle‽",
  "Samdle⸘",
  "Samdle...!",
  "Details",
  "Samdle++",
  "Samdleeee!",
];
