import { AuthContext } from "./Utils/Context";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Page/Login";
import TodoList from "./Page/TodoList";
import Register from "./Page/Register";

function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  return (
    <>
      <AuthContext.Provider value={{ token, setToken, userName, setUserName }}>
        <Routes path="/">
          <Route index element={<Login />} />
          <Route path="todolist" element={<TodoList />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
