import React, { useState, useEffect, useContext } from "react";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ListItem } from "../components/ListItem";
import "react-nice-dates/build/style.css";
import { useHistory } from "react-router";
import axios from "axios";
import { API_URL, formatDate } from "../utils/constants";
import { AuthContext } from "../auth/AuthContext";
import { map } from "lodash";

export const HomeScreen = () => {
  const {
    user: { id },
  } = useContext(AuthContext);
  const actualDate = localStorage.getItem("date");
  const [date, setDate] = useState(
    actualDate ? new Date(actualDate) : new Date()
  );
  const [tasks, setTasks] = useState([]);

  const history = useHistory();

  const onAdd = () => {
    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    setDate(tomorrow);
  };

  const onSubtract = () => {
    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    setDate(yesterday);
  };

  useEffect(() => {
    setTasks([]);
    axios
      .get(`${API_URL}/todos/${id}/${formatDate(date)}`)
      .then(({ data }) => {
        setTasks(data);
      })
      .catch(({ response }) => {
        const { status } = response;
        if (status === 404) {
          setTasks([]);
        }
      });
    localStorage.setItem("date", date);
  }, [date]);

  return (
    <>
      <div className="page-wrapper wrapper-todo p-t-45 p-b-50">
        <div className="wrapper wrapper--w790 wrapper-home">
          <div className="card card-5 card-painting">
            <div className="card-heading heading-login">
              <DatePicker
                date={date}
                onDateChange={setDate}
                locale={enGB}
                format="dd MMM yyyy"
              >
                {({ inputProps, focused }) => (
                  <div className="container-dates">
                    <IoIosArrowBack
                      className="cursor-arrow"
                      onClick={onSubtract}
                    />
                    <input
                      className={
                        "title input-date" + (focused ? " -focused" : "")
                      }
                      {...inputProps}
                    />
                    <IoIosArrowForward
                      className="cursor-arrow"
                      onClick={onAdd}
                    />
                  </div>
                )}
              </DatePicker>
            </div>
            <div className="card-body card-body-painting" id="todo-container">
              {map(tasks, ({ content, dueTime, available, id }, index) => (
                <ListItem
                  key={index}
                  id={id}
                  title={content}
                  time={dueTime}
                  status={available}
                />
              ))}
              <div className="btn btn-add-todo" id="container-btn-register">
                <button
                  className="btn btn--blue btn--radius-2"
                  type="button"
                  onClick={() => history.push("/task")}
                >
                  Nueva tarea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
