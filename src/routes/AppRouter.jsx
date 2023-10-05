
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '../pages/Login-Registro/LoginPage';
import RegisterPage from '../pages/Login-Registro/RegisterPage';
import { AuthProvider, useAuth } from "../context/AuthContext";
import ProtectedRoute from "../../ProtectedRoute";
import { HomeScreen } from '../pages/HomeScreen'
import { AdminScreen } from '../pages/admin/AdminScreen'
import { ContactScreen } from '../pages/ContactScreen'
import { AboutUs } from '../pages/AboutUs'
import AppPedidos from "../AppPedidos"

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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path="/pedidos" element={<AppPedidos />} />

        <Route element={<ProtectedRoute />}>
n
          {/* Ruta ADMIN */}
          <Route path="/admin" element={auth.user?.role === 'admin' ? <AdminScreen /> : <Navigate to="/" />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;