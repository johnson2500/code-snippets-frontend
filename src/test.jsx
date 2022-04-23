import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveAudio from './saveAudio';

const theme = createTheme({
});

export default function App() {
  useEffect(() => {
    const saveAudio = new SaveAudio();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div>Testing</div>
    </ThemeProvider>
  );
}

App.propTypes = {
};

App.defaultProps = {
  dispatch: () => { },
  auth: {},
};
