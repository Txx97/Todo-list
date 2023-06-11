import React, { useContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { Todos } from "./Todos";
import { Modal } from "./Modal";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import { TodoType } from "../Types/types";

const Home = (props) => {
  const router = useRouter();
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState<string>();
  const [todoError, setTodoError] = useState<string>();
  const { user } = useContext(UserContext);
  const [editTodoValue, setEditTodoValue] = useState<TodoType>();

  const handleTodoSubmit = (e) => {
    const id = Math.round(Math.random() * 10000000000).toString();
    e.preventDefault();
    const _todoList = todoList;
    _todoList.push({
      id,
      Todo: todo,
    });
    setTodoList(_todoList);
    setTodo("");
  };

  const deleteTodo = (id: string) => {
    const _todoList = [...todoList];
    const todoToDeleteIndex = todoList.findIndex((_todo) => _todo.id === id);
    _todoList.splice(todoToDeleteIndex, 1);
    setTodoList(_todoList);
  };

  const editModal = (obj: TodoType) => {
    setEditTodoValue(obj);
  };

  const updateTodoHandler = (editTodo, id) => {
    const _todoList = todoList;
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        todoList.splice(i, 1, { id, Todo: editTodo });
      }
      setTodoList(_todoList);
    }
  };

  useEffect(() => {
    if(!user) {
      setTodoList([]);
    }
  },[user])

  return (
    <div className="wrapper">
      <Header />
      <br></br>
      <br></br>
      <div className="container">
        <form
          autoComplete="off"
          className="form-group"
          onSubmit={handleTodoSubmit}
        >
          {user && (
            <>
              <input
                type="text"
                placeholder="Enter TODO's"
                className="form-control"
                required
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
              />
              <br></br>
              <div
                style={{
                  width: 100 + "%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ width: 100 + "%" }}
                >
                  ADD
                </button>
              </div>
            </>
          )}

          {!user && (
            <>
              <input
                type="text"
                placeholder="Enter TODO's"
                className="form-control"
                required
                disabled
              />
              <br></br>
              <div
                style={{
                  width: 100 + "%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled
                  style={{ width: 100 + "%" }}
                >
                  ADD
                </button>
              </div>
              <div className="error-msg">
                Please register your account or login to use application
              </div>
            </>
          )}
        </form>
        {todoError && <div className="error-msg">{todoError}</div>}
        <Todos todos={todoList} deleteTodo={deleteTodo} editModal={editModal} />
      </div>

      {editTodoValue && (
        <Modal
          editTodoValue={editTodoValue}
          editModal={editModal}
          updateTodoHandler={updateTodoHandler}
        />
      )}
    </div>
  );
};

export default Home;
