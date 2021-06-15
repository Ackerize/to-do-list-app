import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "../hooks/useForm";
import validator from "validator";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
  });

  const history = useHistory();

  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    const { username, password } = formValues;
    if (!validator.isEmpty(username) && errors.username) {
      setErrors((e) => ({ ...e, username: null }));
    }
    if (!validator.isEmpty(password) && errors.password) {
      setErrors((e) => ({ ...e, password: null }));
    }
  }, [formValues]);

  const onChangeView = () => {
    history.push("/register")
  }

  const validarForm = () => {
    const { username, password } = formValues;
    let flag = true;
    if (validator.isEmpty(username)) {
      setErrors((e) => ({ ...e, username: true }));
      flag = false;
    } else flag = true;
    if (validator.isEmpty(password)) {
      setErrors((e) => ({ ...e, password: true }));
      flag = false;
    } else flag = true;

    return flag;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validarForm()) {
      axios
        .post(`${API_URL}/login`, formValues)
        .then(({data}) => {
          Swal.fire({
            icon: "success",
            title: "Bienvenido!",
            text: "Has iniciado sesión correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => { 
            history.push("/")
            dispatch({
              type: types.login,
              payload: {
                id: `${data.id}`,
                name: `${data.username}`
              }
            });
          }, 500);
        })
        .catch(({ response }) => {
          const { status } = response;
          if (status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "Credenciales incorrectas",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (status === 500) {
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "Ocurrió un error inesperado",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <>
      <div className="page-wrapper p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5 card-painting">
            <div className="card-heading heading-login">
              <h2 className="title">Iniciar sesión</h2>
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
                      {errors.username && (
                        <p className="error">Ingrese el usuario</p>
                      )}
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
                      {errors.password && (
                        <p className="error">Ingrese su contraseña</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="btn" id="container-btn">
                  <button
                    className="btn btn--blue btn--radius-2"
                    type="submit"
                    id="btn-submit"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
              <div className="btn" id="container-btn-register">
                <button
                  className="btn btn--green btn--radius-2"
                  type="button"
                  onClick={onChangeView}
                >
                  Crear cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
