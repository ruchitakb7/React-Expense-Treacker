import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate=useNavigate()
    const initailval=localStorage.getItem('token')
    const initailId=localStorage.getItem('userId')
 
    const [token,setToken]=useState(initailval)
    const [userId,setUserid]=useState(initailId)
    const isLogin = !!token;

    const login = (tokenId,userId) => {
       
        localStorage.setItem('token',tokenId)
        localStorage.setItem('userId',userId)
        setToken(tokenId)
        setUserid(userId)
        setTimeout(()=>{
            alert('Verify your Email.Ignore if you have alredy did.')
      },6000)
        navigate('/dashboard')
    };

    const logout = () => {
       localStorage.removeItem('token')
       localStorage.removeItem('userId')
       setToken('')
       setUserid('')
       navigate('/')
    };

    return (
        <AuthContext.Provider value={{userId,token, isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
