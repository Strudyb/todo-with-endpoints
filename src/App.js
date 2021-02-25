import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import "./scss/App.scss";

function App() {
  // data states
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [mergedTodos, setMergedTodos] = useState([]);

  // utility states
  const [isPending, setİsPending] = useState(false);
  const [isOpen, setİsOpen] = useState(false);
  const [modalData, setmodalData] = useState([]);

  //input states
  const [titleInput, setTitleInput] = useState("");
  const [isChecked, setİsChecked] = useState();

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(200);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const inputHandler = (title) => {
    setTitleInput(title);
  };

  const checkboxHandler = (bool) => {
    setİsChecked(bool);
  };

  const closeModal = () => {
    setİsOpen(false);
  };

  const openModal = (data) => {
    setİsOpen(true);
    setmodalData(data);
  };

  const merge = (arr1, arr2) => {
    const temp = [];

    arr1.forEach((x) => {
      arr2.forEach((y) => {
        if (x.userId === y.id) {
          temp.push({ ...x, ...y });
        }
      });
    });

    return temp;
  };

  const fetchData = async () => {
    const todoAPI = "https://jsonplaceholder.typicode.com/todos";
    const userAPI = "https://jsonplaceholder.typicode.com/users";

    setİsPending(true);

    const getTodos = await axios.get(todoAPI);
    const getUsers = await axios.get(userAPI);

    axios.all([getTodos, getUsers]).then(
      axios.spread((...allData) => {
        const allTodoData = allData[0];
        const allUserData = allData[1];

        setTodos(allTodoData.data);
        setUsers(allUserData.data);

        setİsPending(false);
      })
    );

    const mergedArr = merge(users, todos);
    console.log(mergedArr);
  };

  const updateData = (objId) => {
    setİsPending(true);
    fetch(`https://jsonplaceholder.typicode.com/todos/${modalData.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: titleInput,
        completed: isChecked,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setİsOpen(false);
        setİsPending(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteData = (id) => {
    setİsPending(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        setİsPending(false);
        console.log(`your data with id ${id} has removed successfully `);
        return res.json();
      })

      .catch((err) => {
        console.log(err.message);
      });

    // delete actually with filter
    const newTodoList = todos.filter((x) => x.id !== id);
    setTodos(newTodoList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getNameById = (id) => {
    return users.find((user) => user.id === id);
  };

  return (
    <div className="App">
      <Header />
      <Table
        todos={currentPosts}
        getNames={getNameById}
        openModal={openModal}
        deleteData={deleteData}
        users={users}
      />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={todos.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {isPending && <Loader />}
      {isOpen && (
        <Modal
          closeModal={closeModal}
          modalData={modalData}
          updateData={updateData}
          inputHandler={inputHandler}
          checkboxHandler={checkboxHandler}
        />
      )}
    </div>
  );
}

export default App;
