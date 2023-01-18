import { Link } from "react-router-dom";
import "../App.css";

export default function Dashboard() {
  return (
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
              <Link to="/updateorder">1</Link>
              <label>01/01/2021</label>
              <label>Santa Marta</label>
              <label>Calle 1 #2-3</label>
              <label>Guardado</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}