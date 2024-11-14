import React from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignupPage from "./components/pages/Signup";
import Loginpage from "./components/pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/' element={<Loginpage/>}></Route>
      </Routes>
      </Router>
  );
}

export default App;
