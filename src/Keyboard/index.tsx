import { PickedTypes } from "~src/Game";
import classes from "./keyboard.module.scss";

const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const Key = ({ keyName, checked = "", ...props }) => (
  <div
    className={`${classes.key} ${checked !== "" ? classes[checked] : ""}`}
    {...props}
  >
    {keyName}
  </div>
);

//changeWord with arg- add letter. No arg- delete letter.
export const Keyboard = ({
  checkedLetters,
  changeWord,
  submit,
}: {
  checkedLetters: Record<string, PickedTypes | "">;
  changeWord: (_?: string) => void;
  submit: () => void;
}) => {
  return (
    <div className={classes.container}>
      {rows.map((row) => (
        <div className={classes.row}>
          {[...row].map((keyName) => (
            <>
              {keyName === "Z" && (
                <Key keyName={"⏎"} onClick={() => submit()} />
              )}
              <Key
                checked={checkedLetters[keyName]}
                onClick={() => changeWord(keyName)}
                {...{ keyName }}
              />
              {keyName === "M" && (
                <Key keyName={"⌫"} onClick={() => changeWord()} />
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};
