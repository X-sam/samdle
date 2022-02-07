import { useContext, useMemo } from "react";
import classes from "./modal.module.scss";
import { Countdown } from "~src/Countdown";
import { Share } from "~src/Share";
import { Stats } from "~src/Stats";
import { State } from "~src/State/state";
import { pick, nativeMath } from "random-js";

export const Modal = () => {
  const { gameState } = useContext(State);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Header />
        <Stats />
        <div className={classes.next}>
          <div>Next Game In:</div>
          <Countdown />
        </div>
        {gameState !== "Playing" && <Share />}
      </div>
    </div>
  );
};
const Header = () => {
  const { dispatch } = useContext(State);
  const titleText = useMemo(() => pick(nativeMath, TitleOptions), []);
  return (
    <div className={classes.topBar}>
      <div>{titleText}</div>
      <button
        className={classes.close}
        onClick={() => {
          dispatch({ type: "HideModal" });
        }}
      >
        X
      </button>
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
