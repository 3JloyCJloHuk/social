import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from 'reactfire';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
import GuestLayout from '../GuestLayout';
import AuthenticatedLayout from '../AuthenticatedLayot';
import NotFoundScreen from '../NotFoundScreen';

const Root: React.FC = () => {
  const {
    data: user,
    // hasEmitted,
    firstValuePromise,
  } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const isLogged = !!user;
  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  if (!isUserLoaded) {
    return null;
  }

  if (isLogged) {
    return (
      <AuthenticatedLayout>
        <Routes>
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
