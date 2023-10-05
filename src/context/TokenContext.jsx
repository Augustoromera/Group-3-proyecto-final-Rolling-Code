import { createContext, useContext } from 'react';

const AuthTokenContext = createContext();

export const useAuthToken = () => {
    return useContext(AuthTokenContext);
};

export default AuthTokenContext;
