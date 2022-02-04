import classes from "./tile.module.scss";

export const Tile = ({
  letter,
  type,
}: {
  letter?: string;
  type?: "Green" | "Yellow" | "Grey";
}) => <div className={`${classes.tile} ${classes[type]}`}>{letter}</div>;
