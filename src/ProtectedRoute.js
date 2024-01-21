// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ element, ...rest }) => {
  const auth = getAuth();
  let user = null;

  onAuthStateChanged(auth, (loggedInUser) => {
    user = loggedInUser;
  });

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/" />}
    />
  );
};

export default ProtectedRoute;
