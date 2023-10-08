// AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, setAuthToken } from '../api/auth';
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
        const token = res.data.token;
        setAuthToken(token);
        Cookies.set("token", res.data.token);
        setIsAuthenticated(true);
        checkLogin();
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      const token = res.data.token;
      setAuthToken(token);
      Cookies.set("token", res.data.token);
      setIsAuthenticated(true);
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
    setAuthToken(null);
  };
  async function checkLogin() {
    const token = Cookies.get("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      setAuthToken(null);
      return;
    }
    try {
      const res = await verifyTokenRequest(token);

      if (!res.data) {
        setIsAuthenticated(false);
        setUser(null);
        setAuthToken(null);
      } else {
        setIsAuthenticated(true);
        setUser(res.data);
      }
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);
  useEffect(() => {
    checkLogin();
  }, [])
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
