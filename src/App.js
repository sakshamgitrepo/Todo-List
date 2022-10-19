import { useState, useEffect } from "react";
import "./App.css";
import Content from "./Components/Content";
import Form from "./Components/Form";
import Search from "./Components/Search";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("TodoList")) || []
  );
  const [editId, setEditId] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }, [todos]);

  //Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      //checking if editId is equal to fi.id
      const editTodo = todos.find((fi) => fi.id === editId);
      const updatedTodos = todos.map((uptodo) =>
        uptodo.id === editTodo.id
          ? (uptodo = { id: uptodo.id, todo })
          : { id: uptodo.id, todo: uptodo.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  //Delete Button
  const handleDelete = (id) => {
    const delTodo = todos.filter((filt) => filt.id !== id);
    setTodos([...delTodo]);
  };

  //Edit Button
  const handleEdit = (id) => {
    //find returns whole object not just id
    const editTodo = todos.find((fi) => fi.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  //Finish Button
  const handleCheck = (id) => {
    const checktodos = todos.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodos(checktodos);
    setEditId(0);
    setTodo("");
    return;
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <Form
          handleSubmit={handleSubmit}
          setTodo={setTodo}
          todo={todo}
          editId={editId}
        />
        <Search search={search} setSearch={setSearch} />
        <Content
          // todos={todos}
          todos={todos.filter((item) =>
            item.todo.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
