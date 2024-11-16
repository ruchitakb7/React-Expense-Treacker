import React,{useContext} from "react"
import {Routes, Route } from "react-router-dom"
import SignupPage from "./components/pages/Signup";
import Loginpage from "./components/pages/Login";
import DashBoardpage from "./components/pages/DashBoard";
import Home from "./components/layout/Home";
import { AuthContext } from "./store/AuthProvider";
import { Navigate } from "react-router-dom";

function App() {

  const ctx=useContext(AuthContext)
  console.log(ctx)
  return (
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {!ctx.isLogin &&(
        <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Loginpage />} />
        </>
        ) }
        
             <Route path="/dashboard" element={<DashBoardpage/>}></Route>
         
       
      </Routes>
    
  );
}

export default App;
