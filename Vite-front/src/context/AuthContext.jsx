import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () =>{
  const context = useContext(AuthContext);
  if(!context) throw new Error ("useAuth deberia estar dentro de AuthProvider");
    return context;
  };
  
  
  export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
       if(errors && errors.length > 0){
        const timer = setTimeout(() =>{
           setErrors([]);
         }, 5000)
         return () => clearTimeout(timer);
       }
    }, [errors])

    
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
        setUser(res.data);
        setIsAuthenticated(true);
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


       useEffect(() =>{
           async function checkLogin () {
              const cookies = Cookies.get()
                  
            if(!cookies.token){
                  setIsAuthenticated(false);
                  setUser(null);
                  setLoading(false);
                  return;
            }
                      
              try {
                const res =  await verifyTokenRequest(cookies.token)
                if(!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);


              } catch (error) {
                setIsAuthenticated(false)
                setLoading(false);

                
              
         }
            };
            checkLogin();
       }, []);



      
    return(

       <AuthContext.Provider value={{
         signUp,
         signIn,
         loading,
         user,
         logout,
         isAuthenticated,
         errors,
       }}>

        {children}

       </AuthContext.Provider>
    )
}

export default AuthContext;