import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./components/pages/Signup";
import LoginPage from "./components/pages/Login";
import DashBoardPage from "./components/pages/DashBoard";
import Home from "./components/layout/Home";
import { AuthContext } from "./store/AuthProvider";
import VerifyEmail from "./components/pages/Verifyemail";

function App() {
  const ctx = useContext(AuthContext); 

  return (
    <Routes>
    
      <Route path="/" element={<Home />} />

      {!ctx.isLogin && (
        <>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </>
      )}
      {
        ctx.LoginPage && (
          <Route path="/dashboard" element={<VerifyEmail />} />
        )
      }
    
      {ctx.isLogin ? (
        <Route path="/dashboard" element={<DashBoardPage />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/login" />} />
      )}

      <Route path="*" element={<Navigate to={ctx.isLogin ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
