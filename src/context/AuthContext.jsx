// AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debería estar dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data); // Verifica la respuesta del inicio de sesión
      setIsAuthenticated(true); 
      console.log("first console")
      console.log(isAuthenticated);
      checkLogin();
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  async function checkLogin() {
    const cookies = Cookies.get("token");
    if (!cookies) {
      console.log("NO ESTA")
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }
    console.log("SI ESTA")
    console.log(cookies)
    console.log(Cookies.get("token"))
    console.log(cookies.token)
    try {
      const res = await verifyTokenRequest(cookies.token);
      if (!res.data) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(res.data);
      }
      setLoading(false);
      console.log("El usuario esta autenticado?" + isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, [])
  useEffect(() => {
    console.log("isAuthenticated cambió a:", isAuthenticated); // Esto mostrará el valor actualizado de isAuthenticated
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        loading,
        user,
        logout,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
