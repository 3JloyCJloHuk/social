import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
import AuthenticatedLayout from '../AuthenticatedLayot';
import GuestLayout from '../GuestLayout';
import HomeScreen from '../HomeScreen';
import NotFoundScreen from '../NotFoundScreen';

const Root: React.FC = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  if (status === 'loading') {
    return <div>loading</div>;
  }

  if (signInCheckResult?.signedIn) {
    return (
      <AuthenticatedLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </AuthenticatedLayout>
    );
  }

  return (
    <GuestLayout>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </GuestLayout>
  );
};

export default Root;
