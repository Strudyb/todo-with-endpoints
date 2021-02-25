import React, { useState } from "react";

function Table({ todos, getNames, openModal, deleteData, users }) {
  const [isSorted, setİsSorted] = useState(true);
  // const sorting = () => {
  //     let sortedProducts = todos
  //     sortedProducts.sort((a,b) => {
  //         console.log(b.completed)
  //         if(a.completed < b.completed) {
  //             return -1;
  //         }
  //         if(a.completed > b.completed) {
  //             return 1;
  //         }
  //         return 0;
  //     })
  // }
  const sortToggler = () => {
    setİsSorted(!isSorted);
  };
  return (
    <section className="table-section py-50px">
      <div className="container">
        <div className="table-responsive">
          <ul className="table">
            <li className="table__header">
              <div className="table__col">#</div>
              <div className="table__col col-2">Title</div>
              <div className="table__col text-center">Assignee</div>

              <div className="table__col text-center">
                <button className="btn-sort" href="#" onClick={sortToggler}>
                  Status {isSorted ? "▲" : "▼"}
                </button>
              </div>

              <div className="table__col text-center">Actions</div>
            </li>
            {todos
              .sort((a, b) =>
                isSorted
                  ? a.completed > b.completed
                    ? 1
                    : -1
                  : a.completed < b.completed
                  ? 1
                  : -1
              )
              .map((todo) => (
                <li key={todo.id} className="table__line">
                  <div className="table__col">{todo.id}</div>
                  <div className="table__col col-2">{todo.title}</div>
                  <div className="table__col text-center">asd</div>
                  <div className="table__col text-center">
                    {todo.completed ? "Done" : "In Progress"}
                  </div>
                  <div className="table__col text-center">
                    <button
                      className="btn btn-edit"
                      onClick={() => openModal(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteData(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Table;
