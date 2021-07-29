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
        {`Bienvenido ${name}`}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <button
            className="nav-item nav-link btn w-100 order-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
