import React from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignupPage from "./components/pages/Signup";
import Loginpage from "./components/pages/Login";
import Home from "./components/layout/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
      </Routes>
      </Router>
  );
}

export default App;
