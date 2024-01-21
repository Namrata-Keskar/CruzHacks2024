// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ServiceLanding from './pages/ServiceLanding';
import Register from './pages/Register';
import Food from './pages/Food';
import Housing from './pages/Housing';
import Medical from './pages/Medical';
import AddEvent from './pages/AddEvent';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import MyEvents from './pages/MyEvents';

import app from './firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './Auth';
import UserContext from './UserContext';
import { UserContextProvider } from './UserContext';


const auth = getAuth(app);


const AppRouter = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    // <UserContext.Provider value={{loggedInUser: "no user yet"}}>
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/servicelanding" element={<ServiceLanding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/food" element={<Food />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/profile" element={<Profile />} />


          {/* <Route path="/addevent" element={<AddEvent />} /> */}
          {/* <ProtectedRoute path="/addevent" element={<AddEvent />} /> */}
          <Route
            path="/addevent"
            element={isAuthenticated ? <AddEvent /> : <Navigate to="/" />}
          />
          {/* <Route path="/myevents" element={<MyEvents />} /> */}
          <Route
            path="/myevents"
            element={isAuthenticated ? <MyEvents /> : <Navigate to="/" />}
          />

        </Routes>
      </Router>
    </UserContextProvider>
    // </UserContext.Provider>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Landing />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/servicelanding" element={<ServiceLanding />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/food" element={<Food />} />
    //     <Route path="/housing" element={<Housing />} />
    //     <Route path="/medical" element={<Medical />} />
    //     <Route path="/profile" element={<Profile />} />


    //     {/* <Route path="/addevent" element={<AddEvent />} /> */}
    //     {/* <ProtectedRoute path="/addevent" element={<AddEvent />} /> */}
    //     <Route
    //       path="/addevent"
    //       element={isAuthenticated ? <AddEvent /> : <Navigate to="/" />}
    //     />

    //   </Routes>
    // </Router>


  );
};

export default AppRouter;
