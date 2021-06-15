import axios from "axios";
import React from "react";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router";
import validator from "validator";

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword, username } = formValues;
    if (
      !validator.isEmpty(username) &&
      !validator.isEmpty(password) &&
      password === confirmPassword
    ) {
      axios
        .post(`${API_URL}/user`, { username, password })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Cuenta creada!",
            text: "Usuario creado exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            history.push("/login");
          }, 1500);
        })
        .catch(({ response }) => {
          const { status } = response;
          if (status === 500) {
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "Ocurrió un error inesperado",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else if (validator.isEmpty(username) || validator.isEmpty(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Uno o más campos están vacíos",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="page-wrapper p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5 card-painting">
            <div className="card-heading heading-login">
              <h2 className="title">Crear cuenta</h2>
            </div>
            <div className="card-body card-body-painting">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="name label-text">Usuario: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        value={formValues.username}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Contraseña: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        value={formValues.password}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Repetir contraseña: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="password"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        value={formValues.confirmPassword}
                      />
                    </div>
                  </div>
                </div>

                <div className="btn" id="container-btn">
                  <button
                    className="btn btn--blue btn--radius-2"
                    type="submit"
                    id="btn-submit"
                  >
                    Crear cuenta
                  </button>
                </div>
              </form>
              <div className="btn" id="container-btn-register">
                <button
                  className="btn btn--green btn--radius-2"
                  onClick={() => history.push("/login")}
                  type="button"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
