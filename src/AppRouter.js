// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ServiceLanding from './pages/ServiceLanding';
import Food from './pages/Food';
import Housing from './pages/Housing';
import Medical from './pages/Medical';
import AddEvent from './pages/AddEvent';
import Profile from './pages/Profile';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/servicelanding" element={<ServiceLanding />} />
        <Route path="/food" element={<Food />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
