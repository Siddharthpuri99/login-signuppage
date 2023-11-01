import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Homepage/Home";
import Login from "./components/Login/Login";
import Reg from "./components/Register/Reg";

export default function App() {
  const [user,setLoginUser] = useState({
    name:"",
    email:"",
    password:""
  });
  return (
    <div className="App">
           <Router>
        <Routes>
          <Route path="/" element={user && user._id ? <Home setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Reg />} />
        </Routes>
      </Router>

    </div>
  );
}
