export type Styles = {
  'close': string;
  'container': string;
  'next': string;
  'root': string;
  'topBar': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
