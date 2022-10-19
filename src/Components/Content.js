import React from 'react'

const Content = ({handleCheck, handleDelete, handleEdit, todos}) => {
  return (
<ul className="alltodos">
          {todos.map((tds) => (
            <li className="singletodo" key={tds.id}>
              <span
                className="todotext"
                key={tds.id}
                style={
                  tds.checked
                    ? { textDecoration: "line-through", color: "#262626" }
                    : null
                }
              >
                {tds.todo}
              </span>
              <button onClick={() => handleCheck(tds.id)}>Finished</button>
              <button onClick={(e) => handleEdit(tds.id)}>Edit</button>
              <button onClick={(e) => handleDelete(tds.id)}>Delete</button>
            </li>
          ))}
          <span className="list-length">
            {todos.length}{" "}
            {todos.length === 0
              ? "Empty List"
              : todos.length > 1
              ? "Lists"
              : "List"}
          </span>
        </ul>
    )
}

export default Content