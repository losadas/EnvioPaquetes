import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "./LogOutBtn";

function NavVar() {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);
  return (
    <div>
      <Link to="/">HOME</Link>
      {loggedIn === false && (
        <>
          <Link to="/login">LOGIN</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {loggedIn === true && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/createorder">CreateOrder</Link>
          <Link to="/updateorder">UpdateOrder</Link>
          <LogOutBtn />
        </>
      )}
    </div>
  );
}

export default NavVar;
