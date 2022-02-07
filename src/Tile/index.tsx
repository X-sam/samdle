import classes from "./tile.module.scss";

export const Tile = ({
  type,
  children,
}: {
  type?: "Green" | "Yellow" | "Grey";
  children: string;
}) => <div className={`${classes.tile} ${classes[type]}`}>{children}</div>;
