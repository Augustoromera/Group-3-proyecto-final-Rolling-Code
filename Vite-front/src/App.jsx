import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "../ProtectedRoute";
import Navbar from "./components/Navbar";
import TaskFormPage from "./pages/TaskFormPage";
import { TaskProvider } from "./context/TasksContext";
import TaskPage from "./pages/TaskPage";


function App() {
  return (

    <AuthProvider>
      <TaskProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/login"  element={<LoginPage />}    />
     <Route path="/register"  element={<RegisterPage />}    />
     <Route element={<ProtectedRoute/>}>
     <Route path="/"  element={<HomePage/>}    />
     <Route path="/tasks"  element={<TaskPage/>}    />
     <Route path="/add-task"  element={<TaskFormPage/>}    />
     <Route path="/task/:id"  element={<TaskFormPage/>}    />
     <Route path="/profile"  element={<ProfilePage/>}    />
     </Route>
    </Routes>
   </BrowserRouter>
   </TaskProvider>
   </AuthProvider>
  )
}

export default App


