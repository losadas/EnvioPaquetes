import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css";
import LogOutBtn from "./LogOutBtn";

export default function CreateOrder() {
  const { userToken } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      await axios.post('item', data)
      console.log('Órden creada correctamente')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
    <div className="grande">
      <div className="contenedor-principal">
        <h2>Gestión de paquetes - Registro órdenes</h2>
        <div className="contenedor-interno">
          <div className="contenedor-login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input type="hidden" value={userToken} { ...register("userId")}/>
                <label>Fecha</label>
                <input
                  type="date"
                  {...register("fecha", {
                    required: true,
                  })}
                />
                <label>Hora</label>
                <input
                  type="time"
                  {...register("time", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>Largo</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("largo", {
                    required: true,
                  })}
                />
                <label>Ancho</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("ancho", {
                    required: true,
                  })}
                />
                <label>Alto</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("alto", {
                    required: true,
                  })}
                />
                <label>Peso</label>
                <input
                  className="inputcl"
                  type="number"
                  {...register("peso", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>Dirección recogida</label>
                <input
                  type="text"
                  {...register("direccion", {
                    required: true,
                  })}
                />
                {errors.direccion?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Ciudad recogida</label>
                <select {...register("ciudad")}>
                  <option value="Medellín">Medellín</option>
                  <option value="Leticia">Leticia</option>
                  <option value="Neiva">Neiva</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Manizales">Manizales</option>
                  <option value="Yopal">Yopal</option>
                  <option value="Barranquilla">Barranquilla</option>
                  <option value="Valledupar">Valledupar</option>
                  <option value="Tunja">Tunja</option>
                  <option value="Pasto">Pasto</option>
                </select>
              </div>
              <div>
                <label>Nombre destinatario</label>
                <input
                  type="text"
                  {...register("nomdestin", {
                    required: true,
                    minLength: 6,
                    maxLength: 15,
                  })}
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
                />
                {errors.direccione?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Ciudad entrega</label>
                <select {...register("ciudade")}>
                  <option value="Medellín">Medellín</option>
                  <option value="Leticia">Leticia</option>
                  <option value="Neiva">Neiva</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Manizales">Manizales</option>
                  <option value="Yopal">Yopal</option>
                  <option value="Barranquilla">Barranquilla</option>
                  <option value="Valledupar">Valledupar</option>
                  <option value="Tunja">Tunja</option>
                  <option value="Pasto">Pasto</option>
                </select>
              </div>
              <div>
                <input type="submit" value="Crear órden" />
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