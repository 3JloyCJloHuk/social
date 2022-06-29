import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: { secondary: { main: '#f50057' } },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '50px',
        },
      },
    },
  },
});

export default defaultTheme;
