export type Styles = {
  'Green': string;
  'Grey': string;
  'tile': string;
  'Yellow': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
