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
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = mergedTodos.slice(indexOfFirstPost, indexOfLastPost);

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

  const merge = (array1, array2) => {
    const temp = [];

    array1.forEach((x) => {
      array2.forEach((y) => {
        if (x.userId === y.id) {
          const userNames = y.name;

          temp.push({ ...x, userNames: userNames });
        }
      });
    });

    return temp;
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
        console.log("your data successfully updated: " , json);
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
    const newTodoList = mergedTodos.filter((x) => x.id !== id);
    setMergedTodos(newTodoList);
  };

  useEffect(() => {
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

          setMergedTodos(merge(allTodoData.data, allUserData.data));

          setİsPending(false);
        })
      );
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Table
        todos={currentPosts}
        openModal={openModal}
        deleteData={deleteData}
      />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={mergedTodos.length}
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
