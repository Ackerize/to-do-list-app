import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./auth/AuthContext";
import { AppRouter } from "./routers/AppRouter";
import { authReducer } from "./auth/authReducer";
import './screens/main.css';

const init = () => {
  return JSON.parse(localStorage.getItem("userTodo")) || {logged: false}
}

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("userTodo", JSON.stringify(user));
  }, [user])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
