import axios from "axios";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { API_URL, formatHours } from "../utils/constants";

export const ListItem = ({id, title, time, status}) => {
  const history = useHistory();

  const [selected, setSelected] = useState(!status);

  const onSelect = () => {
    axios.put(`${API_URL}/todos/status/${id}`, { status: !status })
    .then(({data}) => setSelected(!selected))
  }
  return (
    <div className="list-item">
      <input className="check-input" type="checkbox" defaultChecked={!status} onChange={onSelect} />
      <div className="list-labels">
      <p className={"check-label todo-title" + (selected && " done-task-title")} onClick={() => history.push(`/task/${id}`)}>
        {title}
      </p>
      <p className={"check-label time-label" + (selected && " done-task-time")} >
        {formatHours(time)}
      </p>
      </div>
    </div>
  );
};
