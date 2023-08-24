import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/Login-Registro/LoginPage';
import RegisterPage from '../pages/Login-Registro/RegisterPage'
import { AuthProvider } from "../context/AuthContext";
import ProfilePage from "../pages/Login-Registro/ProfilePage";
import HomePage from "../pages/Login-Registro/HomePage";

import ProtectedRoute from "../../ProtectedRoute";
import NavbarLR from "../components/NavbarLR";


function App() {
  return (

    <AuthProvider>
    <BrowserRouter>
    <NavbarLR/>
    <Routes>
     <Route path="/login"  element={<LoginPage />}    />
     <Route path="/register"  element={<RegisterPage />}    />
     <Route element={<ProtectedRoute/>}>
     <Route path="/"  element={<HomePage/>}    />
     <Route path="/profile"  element={<ProfilePage/>}    />
     </Route>
    </Routes>
   </BrowserRouter>
   </AuthProvider>
  )
}

export default App;


