import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterAgency from './pages/RegisterAgency';
import AvailableCars from './pages/AvailableCars';
import AgencyDashboard from './pages/AgencyDashboard';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import MyCars from './pages/MyCars';
import ViewBookings from './pages/ViewBookings';
import MyBookings from './pages/MyBookings';

/* Routes where the global Navbar should be hidden (full-screen layouts) */
const HIDE_NAVBAR_ROUTES = ['/login', '/register-customer', '/register-agency'];

function App() {
  const location = useLocation();
  const showNavbar = !HIDE_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-agency" element={<RegisterAgency />} />
        <Route path="/cars" element={<AvailableCars />} />

        {/* Protected Routes: Customer Only */}
        <Route element={<ProtectedRoute requiredRole="customer" />}>
            <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        {/* Protected Routes: Agency Only */}
        <Route element={<ProtectedRoute requiredRole="agency" />}>
            <Route path="/dashboard" element={<AgencyDashboard />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/edit-car/:id" element={<EditCar />} />
            <Route path="/my-cars" element={<MyCars />} />
            <Route path="/view-bookings" element={<ViewBookings />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
