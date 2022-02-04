import classes from "./keyboard.module.scss";

const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const Key = ({ keyName, changeWord }) => (
  <div
    className={classes.key}
    onClick={() => {
      changeWord(keyName);
    }}
  >
    {keyName}
  </div>
);

const Enter = ({ submit }) => (
  <div className={classes.key} onClick={() => submit()}>
    ⏎
  </div>
);
const Delete = ({ changeWord }) => (
  <div className={classes.key} onClick={() => changeWord()}>
    ⌫
  </div>
);

//changeWord with arg- add letter. No arg- delete letter.
export const Keyboard = ({
  changeWord,
  submit,
}: {
  changeWord: (_?: string) => void;
  submit: () => void;
}) => {
  return (
    <div className={classes.container}>
      {rows.map((row) => (
        <div className={classes.row}>
          {[...row].map((keyName) => (
            <>
              {keyName === "Z" && <Enter {...{ submit }} />}
              <Key {...{ keyName, changeWord }} />
              {keyName === "M" && <Delete {...{ changeWord }} />}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};
