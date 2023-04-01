import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { getLoggedIn } = useContext(AuthContext)

  const onSubmit = async (data) => {
    try {
      await axios.post('login', data)
      getLoggedIn()
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
    }    
  };

  return (
    <div className="grande">
      <div className="contenedor-principal">
        <h2>Gestión de paquetes - Login</h2>
        <div className="contenedor-interno">
          <div className="contenedor-login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="aa">
                <Link to="/register">Registrarse</Link>
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
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
