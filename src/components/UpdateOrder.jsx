import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";
import LogOutBtn from "./LogOutBtn";
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function UpdateOrder() {
  const { userToken } = useContext(AuthContext)
  const [userItem, setUserItem] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');
  async function getUserItem() {
    const items = await axios.get('item', {params: {_id: orderId}});
    setUserItem(items.data)
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async(data) => {
    try {
      console.log('Entro al onSubmit');
      await axios.put('item', data)
      console.log('Órden actualizada correctamente')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getUserItem()
  }, []);

  return (
    <>
    <div className="grande">
      <div className="contenedor-principal">
        <h2>Gestión de paquetes - Actualización de órdenes</h2>
        <div className="contenedor-interno">
          <div className="contenedor-login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Fecha</label>
                <input type="hidden" value={userToken} { ...register("userId")}/>
                <input type="hidden" value={orderId} { ...register("orderId")}/>
                <input
                  type="date"
                  {...register("fecha", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].date : ''}
                />
                <label>Hora</label>
                <input
                  type="time"
                  {...register("time", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].time : ''}
                />
              </div>
              <div>
                <label>Estado</label>
                <select {...register("estado")}>
                  <option value="Guardado" selected={userItem.length > 0 && userItem[0].state === 'Guardado'}>Guardado</option>
                  <option value="Cumplido" selected={userItem.length > 0 && userItem[0].state === 'Cumplido'}>Cumplido</option>
                  <option value="Cancelado" selected={userItem.length > 0 && userItem[0].state === 'Cancelado'}>Cancelado</option>
                </select>
              </div>
              <div>
                <label>Largo</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("largo", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].specs.largo : ''}
                />
                <label>Ancho</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("ancho", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].specs.ancho : ''}
                />
                <label>Alto</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("alto", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].specs.alto : ''}
                />
                <label>Peso</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("peso", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].specs.peso : ''}
                />
              </div>
              <div>
                <label>Dirección recogida</label>
                <input
                  type="text"
                  {...register("direccion", {
                    
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].addrRec : ''}
                />
                {errors.direccion?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Ciudad recogida</label>
                <select {...register("ciudad")}>
                  <option value="Medellín" selected={userItem.length > 0 && userItem[0].cityRec === 'Medellín'}>Medellín</option>
                  <option value="Leticia" selected={userItem.length > 0 && userItem[0].cityRec === 'Leticia'}>Leticia</option>
                  <option value="Neiva" selected={userItem.length > 0 && userItem[0].cityRec === 'Neiva'}>Neiva</option>
                  <option value="Bogotá" selected={userItem.length > 0 && userItem[0].cityRec === 'Bogotá'}>Bogotá</option>
                  <option value="Manizales" selected={userItem.length > 0 && userItem[0].cityRec === 'Manizales'}>Manizales</option>
                  <option value="Yopal" selected={userItem.length > 0 && userItem[0].cityRec === 'Yopal'}>Yopal</option>
                  <option value="Barranquilla" selected={userItem.length > 0 && userItem[0].cityRec === 'Barranquilla'}>Barranquilla</option>
                  <option value="Valledupar" selected={userItem.length > 0 && userItem[0].cityRec === 'Valledupar'}>Valledupar</option>
                  <option value="Tunja" selected={userItem.length > 0 && userItem[0].cityRec === 'Tunja'}>Tunja</option>
                  <option value="Pasto" selected={userItem.length > 0 && userItem[0].cityRec === 'Pasto'}>Pasto</option>
                </select>
              </div>
              <div>
                <label>Nombre destinatario</label>
                <input
                  type="text"
                  {...register("nomdestin", {
                    required: true
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].nameDes : ''}
                />
                {errors.nomdestin?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Cédula/Nit destinatario</label>
                <input
                  type="number"
                  {...register("cedula", {
                    required: true,
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].cedDes : ''}
                />
                {errors.cedula?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Dirección entrega</label>
                <input
                  type="text"
                  {...register("direccione", {
                    required: true,
                  })}
                  defaultValue={userItem.length > 0 ? userItem[0].addrEnt : ''}
                />
                {errors.direccione?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Ciudad entrega</label>
                <select {...register("ciudade")} > 
                  <option value="Medellín" selected={userItem.length > 0 && userItem[0].cityEnt === 'Medellín'}>Medellín</option>
                  <option value="Leticia" selected={userItem.length > 0 && userItem[0].cityEnt === 'Leticia'}>Leticia</option>
                  <option value="Neiva" selected={userItem.length > 0 && userItem[0].cityEnt === 'Neiva'}>Neiva</option>
                  <option value="Bogotá" selected={userItem.length > 0 && userItem[0].cityEnt === 'Bogotá'}>Bogotá</option>
                  <option value="Manizales" selected={userItem.length > 0 && userItem[0].cityEnt === 'Manizales'}>Manizales</option>
                  <option value="Yopal" selected={userItem.length > 0 && userItem[0].cityEnt === 'Yopal'}>Yopal</option>
                  <option value="Barranquilla" selected={userItem.length > 0 && userItem[0].cityEnt === 'Barranquilla'}>Barranquilla</option>
                  <option value="Valledupar" selected={userItem.length > 0 && userItem[0].cityEnt === 'Valledupar'}>Valledupar</option>
                  <option value="Tunja" selected={userItem.length > 0 && userItem[0].cityEnt === 'Tunja'}>Tunja</option>
                  <option value="Pasto" selected={userItem.length > 0 && userItem[0].cityEnt === 'Pasto'}>Pasto</option>
                </select>
              </div>
              <div>
                <input type="submit" value="Actualizar órden" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <LogOutBtn/>
    </>
  );
}