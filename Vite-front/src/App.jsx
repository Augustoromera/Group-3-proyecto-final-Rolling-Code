import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "../ProtectedRoute";
import Navbar from "./components/Navbar";


function App() {
  return (

    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
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

export default App


