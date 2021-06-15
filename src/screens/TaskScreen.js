import React, { useState, useEffect, useContext } from "react";
import TimePicker from "react-gradient-timepicker";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../auth/AuthContext";
import { API_URL, formatDate, formatTime } from "../utils/constants";
import { useParams } from "react-router-dom";

const TaskScreen = () => {
  const {
    user: { id },
  } = useContext(AuthContext);

  let { idTask } = useParams();

  const actualDate = localStorage.getItem("date");
  const [task, setTask] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(new Date(actualDate));

  const [values, handleInputChange, , updateState] = useForm({
    content: "",
    dueDate: "",
    dueTime: "",
    idUser: id,
  });

  useEffect(() => {
    axios.get(`${API_URL}/todos/find/${id}/${idTask}`).then(({ data }) => {
      const { content, dueDate, dueTime } = data;
      setTask(data);
      updateState({
        content,
        dueDate,
        dueTime,
        idUser: id,
      });
      setTime(dueTime);
    });
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (time == null) {
      const today = new Date();
      const now = today.getHours() + ":" + today.getMinutes();
      setTime(now);
    }
  }, []);

  const onDelete = () => {
    Swal.fire({
      title: "¿Deseas borrar esta tarea?",
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#FF5555",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/todos/${idTask}`).then((result) => {
          Swal.fire(
            "¡Tarea eliminada!",
            "La tarea ha sido eliminada con éxito",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              history.push("/home");
            }
          });
        });
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const timeAux = time.split(":");
    const now = new Date();
    const dueTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      ...timeAux
    );
    console.log(dueTime);
    const data = {
      ...values,
      dueDate: formatDate(date),
      dueTime: formatTime(dueTime),
    };
    console.log(data.dueTime);
    if (task) {
      axios
        .put(`${API_URL}/todos/${idTask}`, data)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: "¡Tarea actualizada!",
            text: "La tarea ha sido actualizada con éxito",
            showConfirmButton: false,
            timer: 1400,
          });
          setTimeout(() => {
            history.push("/home");
          }, 1400);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      axios
        .post(`${API_URL}/todos/new`, data)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: "¡Tarea creada!",
            text: "La tarea ha sido creada con éxito",
            showConfirmButton: false,
            timer: 1400,
          });
          setTimeout(() => {
            history.push("/home");
          }, 1400);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
    console.log(data);
  };

  return (
    <>
      <div className="page-wrapper p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5 card-painting">
            <div className="card-heading heading-task">
              <IoMdArrowBack
                className="back-btn"
                onClick={() => {
                  history.push("/home");
                }}
              />
              <div className="title-container">
                <h2 className="title">Nueva tarea</h2>
              </div>
            </div>
            <div className="card-body card-body-painting">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="name label-text">Titulo: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="content"
                        value={values.content}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Fecha: </div>
                  <div className="value">
                    <div className="input-group">
                      <DatePicker
                        date={date}
                        onDateChange={setDate}
                        locale={enGB}
                      >
                        {({ inputProps, focused }) => (
                          <input
                            className={
                              "input-date-picker" + (focused ? " -focused" : "")
                            }
                            {...inputProps}
                          />
                        )}
                      </DatePicker>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Hora: </div>
                  <div className="value">
                    <div className="input-group">
                      <TimePicker
                        time={time}
                        theme="Bourbon"
                        className="input-date-picker input-time"
                        placeholder="HH:MM"
                        onSet={(val) => {
                          setTime(val.format24);
                          console.log(val.format24);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="btn-groups">
                  <div className="btn" id="container-btn">
                    <button
                      className="btn btn--blue btn--radius-2"
                      type="submit"
                      id="btn-submit"
                    >
                      Guardar
                    </button>
                  </div>
                  {task && (
                    <div className="btn" id="container-btn-register">
                      <button
                        className="btn btn--red btn--radius-2"
                        type="button"
                        onClick={onDelete}
                      >
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskScreen;
