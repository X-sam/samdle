export type Styles = {
  'bar': string;
  'bars': string;
  'pcts': string;
  'root': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
