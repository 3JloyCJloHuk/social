import { Box } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, getFirestore, limit, onSnapshot, query } from 'firebase/firestore';
import React from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import Header from '../Header';

const HomeScreen: React.FC = () => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const { status, data } = useUser();
  const userId = data?.uid;
  const userInfo = data?.providerData[0];

  // initals Name and Surmane  Vova Shdo -- VS
  const initials = userInfo?.displayName
    ? userInfo?.displayName.match(/\b(\w)/g)?.join('')
    : undefined;

  const clickSignOut = async () => {
    try {
      const data = await signOut(auth);
    } catch (error) {}
    clearFirestoreCache();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header clickSignOut={clickSignOut} initials={initials} />
    </Box>
  );
};

export default HomeScreen;
