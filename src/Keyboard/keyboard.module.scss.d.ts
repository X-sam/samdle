export type Styles = {
  'container': string;
  'Green': string;
  'Grey': string;
  'key': string;
  'row': string;
  'Yellow': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
