import React from 'react'

const Form = ({handleSubmit, setTodo, todo, editId}) => {
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
    <input
      type="text"
      onChange={(e) => setTodo(e.target.value)}
      value={todo}
    />
    <button type="submit"> {editId ? "Edit" : "Add"}</button>
  </form>
  )
}

export default Form