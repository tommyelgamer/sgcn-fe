import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#343e4a',
    },
    secondary: {
      main: '#0277bd',
    },
    background: {
      default: '#e0e0e0',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // scrollbarColor: '#343e4a #343e4a',
          // '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          //   backgroundColor: '#343e4a',
          // },
          // '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          //   borderRadius: 8,
          //   backgroundColor: '#343e4a',
          //   minHeight: 24,
          //   border: '3px solid #514F59',
          // },
          // '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
          //   backgroundColor: '#343e4a',
          // },
          // '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
          //   backgroundColor: '#343e4a',
          // },
          // '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
          //   backgroundColor: '#343e4a',
          // },
          // '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
          //   backgroundColor: '#343e4a',
          // },
          '&::-webkit-scrollbar': {
            width: 3,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#e0e0e0',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#514F59',
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default muiTheme;
