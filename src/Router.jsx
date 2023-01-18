import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateOrder from "./components/CreateOrder";
import UpdateOrder from "./components/UpdateOrder";
import NavVar from "./components/NavVar";
import Dashboard from "./components/Dashboard";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

function Rutas() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<NavVar />} />
          {loggedIn === false && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {loggedIn === true && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/createorder" element={<CreateOrder />} />
              <Route path="/updateorder" element={<UpdateOrder />} />
            </>
          )}
        </Routes>
      </>
    </Router>
  );
}

export default Rutas;
