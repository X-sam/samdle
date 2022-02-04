import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { PickedTypes } from "~src/Game";
import classes from "./keyboard.module.scss";

const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const Key = ({ keyName, checked = "", ...props }) => {
  const ref = useRef<HTMLDivElement>();
  const [fontSize, setFontSize] = useState(16);
  const [loaded, setLoaded] = useState(false);
  const handleSize = () => {
    const height = ref?.current?.getBoundingClientRect().height;
    setFontSize(height * 0.5);
  };
  useEffect(() => {
    setLoaded(true);
  }, []);
  useLayoutEffect(() => {
    if (!loaded) return;
    handleSize();
  }, [loaded]);
  useEventListener("resize", handleSize);
  return (
    <div
      className={`${classes.key} ${checked !== "" ? classes[checked] : ""}`}
      ref={ref}
      {...props}
    >
      <div style={{ fontSize }}>{keyName}</div>
    </div>
  );
};

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
