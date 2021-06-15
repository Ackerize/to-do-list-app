import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";

export const Navbar = () => {
  const {
    user: { name },
    dispatch,
  } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });

    history.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
       { `Bienvenido ${name}` }
      </Link>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <button className="nav-item nav-link btn" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
