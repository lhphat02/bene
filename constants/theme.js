/**
 * Represents the theme object containing color values.
 * @typedef {Object} Theme
 * @property {Object} colors - The color values for the theme.
 * @property {string} colors.primary - The primary color.
 * @property {string} colors.secondary - The secondary color.
 * @property {string} colors.tertiary - The tertiary color.
 * @property {string} colors.background - The background color.
 */
const theme = {
  colors: {
    primary: '#27374D',
    secondary: '#526D82',
    tertiary: '#9DB2BF',
    background: '#DDE6ED',
  },
  darkColors: {
    primary: '#212121',
    secondary: '#333333',
    tertiary: '#444444',
    background: '#141414',
  },
};

export default theme;
