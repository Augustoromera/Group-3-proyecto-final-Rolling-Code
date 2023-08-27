import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '../pages/Login-Registro/LoginPage';
import RegisterPage from '../pages/Login-Registro/RegisterPage';
import { AuthProvider, useAuth } from "../context/AuthContext";
import ProfilePage from "../pages/Login-Registro/ProfilePage";
import ProtectedRoute from "../../ProtectedRoute";
import NavbarLR from "../components/NavbarLR";
import { HomeScreen } from '../pages/HomeScreen'
import { AdminScreen } from '../pages/admin/AdminScreen'
import { ContactScreen } from '../pages/ContactScreen'
import { AboutUs } from '../pages/AboutUs'

function AppRouter() {
  return (
    <AuthProvider>
      <AppLR />
    </AuthProvider>
  );
}

function AppLR() {
  const auth = useAuth(); // hook useAuth para obtener la información del usuario

  return (
    <BrowserRouter>
      <NavbarLR />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path='/aboutus' element={<AboutUs />} />

          {/* Ruta ADMIN */}
          <Route path="/admin" element={auth.user?.role === 'admin' ? <AdminScreen /> : <Navigate to="/" />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
