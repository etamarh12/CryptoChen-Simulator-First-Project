import Register from "./components/Register"
import React, { useContext } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import Mycoins from "./components/Mycoins";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";
import TopBar from "./components/TopBar";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ForgetPassword" element={<ForgetPassword />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={user ? <Home /> : <Login />} />
        <Route path="register" element={user ? <Home /> : <Register />} />
        <Route path="my-coins" element={user ? <Mycoins /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;