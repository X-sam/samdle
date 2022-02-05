import { useContext, useState } from "react";
import { intervalToDuration } from "date-fns";
import { useInterval } from "usehooks-ts";
import classes from "./countdown.module.scss";
import { State } from "~src/state";

export const Countdown = () => {
  const { nextDay } = useContext(State);
  const [ival, setIval] = useState(
    intervalToDuration({ start: Date.now(), end: nextDay })
  );
  useInterval(() => {
    setIval(intervalToDuration({ start: Date.now(), end: nextDay }));
  }, 1000);
  const outString = `${ival.hours.toString().padStart(2, "0")}:${ival.minutes
    .toString()
    .padStart(2, "0")}:${ival.seconds.toString().padStart(2, "0")}`;
  return <div className={classes.root}>{outString}</div>;
};
