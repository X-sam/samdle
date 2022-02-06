import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useContext,
} from "react";
import { useEventListener } from "usehooks-ts";
import { State } from "~src/state";
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
  changeWord,
  submit,
}: {
  changeWord: (_?: string) => void;
  submit: () => void;
}) => {
  const { setState, ...state } = useContext(State);
  const { checkedLetters } = state;
  return (
    <div className={classes.container}>
      {rows.map((row) => (
        <div className={classes.row}>
          {[...row].map((keyName) => (
            <>
              {keyName === "Z" && (
                <Key
                  keyName={"☰"}
                  onClick={() => setState({ ...state, showModal: true })}
                />
              )}
              <Key
                checked={checkedLetters[keyName]}
                onClick={() => changeWord(keyName)}
                {...{ keyName }}
              />
              {keyName === "L" && (
                <Key keyName={"⏎"} onClick={() => submit()} />
              )}
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
