export type Styles = {
  'container': string;
  'key': string;
  'row': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
