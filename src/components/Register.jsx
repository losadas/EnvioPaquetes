import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
axios.defaults.withCredentials = true

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const { getLoggedIn } = useContext(AuthContext)
  

  const onSubmit = async (data) => {
    try {
      await axios.post('user', data)
      getLoggedIn()
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
    }    
  };

  return (
    <div className="grande">
      <div className="contenedor-principal">
        <h2>Gestión de paquetes - Registro Usuarios</h2>
        <div className="contenedor-interno">
          <div className="contenedor-login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Nombres</label>
                <input
                  type="text"
                  {...register("nombre", {
                    required: true,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
              </div>
              <div>
                <label>Usuario</label>
                <input
                  type="text"
                  {...register("usuario", {
                    required: true,
                    minLength: 6,
                    maxLength: 15,
                  })}
                />
                {errors.usuario?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
                {errors.usuario?.type === "minLength" && (
                  <p>Mínimo 6 caracteres</p>
                )}
                {errors.usuario?.type === "maxLength" && (
                  <p>Máximo 15 caracteres</p>
                )}
              </div>
              <div>
                <label>Contraseña</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p>El campo es Requerido</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p>Mínimo 6 caracteres</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p>Máximo 16 caracteres</p>
                )}
              </div>
              <div>
                <label>Correo</label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                  })}
                />
                {errors.email?.type ==="required" && <p>El campo es requerido</p>}
                {errors.email?.type === "pattern" && <p>El formato de email es incorrecto</p>}
              </div>
              <div>
                <input type="submit" value="Crear" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}