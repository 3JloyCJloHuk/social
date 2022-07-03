import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import Root from '../Root';
import theme from '../../../common/theme';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const App: React.FC = () => {
  const app = useFirebaseApp();
  const firestoreDatabase = getFirestore(app);
  const auth = getAuth(app);

  return (
    <BrowserRouter>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestoreDatabase}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Root />
          </ThemeProvider>
        </FirestoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
