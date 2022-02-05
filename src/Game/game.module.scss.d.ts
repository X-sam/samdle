export type Styles = {
  'container': string;
  'flash': string;
  'gameLostActive': string;
  'gameLostEnter': string;
  'gameWinActive': string;
  'gameWinEnter': string;
  'grid': string;
  'row': string;
  'rowActive': string;
  'rowEnter': string;
  'rowWinActive': string;
  'rowWinEnter': string;
  'shakeX': string;
  'winSpin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
