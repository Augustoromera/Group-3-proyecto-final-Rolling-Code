import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '../pages/Login-Registro/LoginPage';
import RegisterPage from '../pages/Login-Registro/RegisterPage';
import { AuthProvider, useAuth } from "../context/AuthContext";
import ProfilePage from "../pages/Login-Registro/ProfilePage";
import HomePage from "../pages/Login-Registro/HomePage";
import AdminPage from "../pages/Login-Registro/AdminPAge";
import ProtectedRoute from "../../ProtectedRoute";
import NavbarLR from "../components/NavbarLR";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const auth = useAuth(); // hook useAuth para obtener la información del usuario

  return (
    <BrowserRouter>
      <NavbarLR />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Ruta ADMIN */}
          <Route path="/admin-page" element={auth.user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
