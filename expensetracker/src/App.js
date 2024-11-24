import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./components/pages/Signup";
import LoginPage from "./components/pages/Login";
import DashBoardPage from "./components/pages/DashBoard";
import Home from "./components/layout/Home";
import { useSelector } from "react-redux";
import VerifyEmail from "./components/pages/Verifyemail";
import Forgotpassword from "./components/Features/forgotpassword";
import Expense from "./components/Features/Expenses"

function App() {
 
  const isLogin=useSelector((state)=>state.auth.isLogin)

  return (
    <Routes>
    
      <Route path="/" element={<Home />} />

      {!isLogin && (
        <>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<Forgotpassword></Forgotpassword>}></Route>
        </>
      )}
      {
       isLogin && (
          <>
           {/* <Route path="/dashboard" element={<VerifyEmail />} /> */}
           <Route path="/expense" element={<Expense/>} />
           </>
         
        )
      }
    
      {isLogin ? (
        <Route path="/dashboard" element={<DashBoardPage />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/login" />} />
      )}

      <Route path="*" element={<Navigate to={isLogin ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
