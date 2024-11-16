import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate=useNavigate()
    const initailval=localStorage.getItem('token')
 
    const [token,setToken]=useState(initailval)
    const isLogin = !!token;

    const login = (tokenId) => {
       
        localStorage.setItem('token',tokenId)
        setToken(tokenId)
    };

    const logout = () => {
       localStorage.removeItem('token')
       setToken('')
       navigate('/')
    };

    return (
        <AuthContext.Provider value={{token, isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
