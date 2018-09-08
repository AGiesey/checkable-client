import { createMuiTheme } from '@material-ui/core';

const checkableLightTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#8561c5',
      main: '#673ab7',
      dark: '#482880'
    },
    secondary: {
      light: '#33eb91',
      main: '#00e676',
      dark: '#00a152'
    },
  },
});

export { checkableLightTheme }