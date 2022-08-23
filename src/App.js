import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import TodoList from "./Components/TodoList";
import Register from "./Components/Register";

function App() {
  return (
    <>
    <Routes path="/">
      <Route index element={<Login />}/>
      <Route path="todolist" element={<TodoList />}/>
      <Route path="register" element={<Register />}/>
      <Route path="*" element={<Login />}/>
    </Routes>  
    </>
  );
}

export default App;
