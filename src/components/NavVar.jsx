import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "./LogOutBtn";
import './navstyl.css';

function NavVar() {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);
  return (
    <>
    <nav id="navbar">
    <div>
        Welcome, please login
    </div>
    <div>
      
      {loggedIn === false && (
        <>
          <Link to="/login">Login</Link>
          <div>
            Or
          </div>
          <Link to="/register">Register</Link>
        </>
      )}

      {loggedIn === true && (
        <>
          <LogOutBtn />
        </>
      )}
    </div>
    </nav>
    
    
    </>
  );
}

export default NavVar;
