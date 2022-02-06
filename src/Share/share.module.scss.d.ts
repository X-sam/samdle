export type Styles = {
  'active': string;
  'enter': string;
  'popup': string;
  'root': string;
  'slideOutUp': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
