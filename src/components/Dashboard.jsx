import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useEffect, useState, Fragment, useContext } from "react";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "./LogOutBtn";

export default function Dashboard() {
  const [userItems, setUserItems] = useState([]);
  const { userToken } = useContext(AuthContext)
  async function getUserItems() {
    const items = await axios.get('item', {params: {userToken}});
    setUserItems(items.data)
  }
  useEffect(() => {
    getUserItems()
  }, []);
  return (
    <>
    <div className="grande">
      <div className="contenedor-principal">
        <h2>Gestión de paquetes - Listado de órdenes</h2>
        <div className="aa1">
          <Link to="/createorder">Crear Orden</Link>
        </div>
        <div className="contenedor-interno1">
          <div className="contenedor-login1">
            <div className="titlesdash">
              <h3># Servicio</h3>
              <h3>Fecha</h3>
              <h3>Ciudad Entrega</h3>
              <h3>Dirección Entrega</h3>
              <h3>Estado</h3>
            </div>
            <hr />
            <div className="titlesdash">
            {userItems.map(element => {
                return (<Fragment key={element.cedDes}>
                  <Link to={{pathname: '/updateorder', search: `?orderId=${element.id}`}}>1</Link>
                  <label>{element.date}</label>
                  <label>{element.cityEnt}</label>
                  <label>{element.addrEnt}</label>
                  <label>{element.state}</label>
                </Fragment>)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    <LogOutBtn/>
    </>
  );
}