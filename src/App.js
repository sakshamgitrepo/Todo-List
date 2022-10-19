import { useState,useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState( JSON.parse(localStorage.getItem("TodoList"))||[]);
  const [editId, setEditId] = useState(0);

useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }, [todos])

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

  const handleDelete = (id) => {
    const delTodo = todos.filter((filt) => filt.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    //find returns whole object not just id
    const editTodo = todos.find((fi) => fi.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
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
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit"> {editId ? "Edit" : "Add"}</button>
        </form>

        <ul className="alltodos">
          {todos.map((tds) => (
            <li className="singletodo"key={tds.id}>
              <span className="todotext" key={tds.id} style={tds.checked?{textDecoration:'line-through', color:'#262626'}:null}>
                {tds.todo}
              </span>
              <button onClick={()=>handleCheck(tds.id)}>Finished</button>
              <button onClick={(e) => handleEdit(tds.id)}>Edit</button>
              <button onClick={(e) => handleDelete(tds.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
