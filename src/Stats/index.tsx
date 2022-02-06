import { useContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { State } from "~src/state";
import { StateType } from "~src/types";
import classes from "./stats.module.scss";

export const Stats = () => {
  const [stats] = useLocalStorage<Record<number, StateType>>("samdle", {});
  const { wordNo } = useContext(State);
  console.log(stats);

  if (!stats[wordNo]) return <></>;
  const pcts = Object.entries(stats).reduce(
    (acc, [, { currentGuess }]) => ({
      ...acc,
      [currentGuess]: acc[currentGuess] + 1,
    }),
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  );
  const total = Object.values(pcts).reduce((acc, cur) => acc + cur, 0);
  const lastFail =
    Object.entries(stats)
      .sort(([a], [b]) => Number(a) - Number(b))
      .reverse()
      .find(([, { currentGuess }]) => currentGuess > 5)?.[0] ?? 0;
  let streak = wordNo - Number(lastFail);
  if (lastFail === 0) streak = Object.entries(stats).length;
  return (
    <div className={classes.root}>
      <div>
        You've solved {streak} in a row!{" "}
        {streak > 10
          ? streakMap[Math.floor(Math.random() * streakMap.length - 1)]
          : ""}
      </div>
      {Object.keys(pcts).map((k) => {
        const pct = ((pcts[k] * 100) / total).toFixed(0);
        return (
          <div key={k} className={classes.pcts}>
            <div>{k === "6" ? "X" : 1 + Number(k)}:</div>
            <div className={classes.bars}>
              <div
                className={classes.bar}
                style={{ flex: pcts[k] / total }}
              ></div>
              <div style={{ flex: 1 - pcts[k] / total }}>{pct}%</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const streakMap = ["Nice!", "Wow!", "Great!", "Whoo!"];

const notes = [
  `You are a lovely person!`,
  `Your friends must be so lucky!`,
  `You've played {} days total- thank you for the support!`,
  `You use {} a lot- {}% of the time!`,
  `You almost never guess {}- maybe try it some time?`,
  `Your first guess often contains a lot of {}!`,
];
