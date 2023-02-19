import { useEffect, useState } from "react";
import "./App.css";
import { toast, Toaster } from "react-hot-toast";
import Todos from "./Todos";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todoState, setTodoState] = useState(false);


  //add function
  const addTodo = () => {
    let newTodoItem = {
      id: allTodos.length === 0 ? 1 : allTodos[allTodos.length - 1].id + 1,
      title: title,
      description: desc,
      status: false,
    };
    let updatedTodoList = [...allTodos];
    updatedTodoList.push(newTodoItem);
    setAllTodos(updatedTodoList);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
    setTitle("");
    setDesc("");
    toast.success("Task added successfully! 😃");
  };

  //delete function
  const handleDelete = (id) => {
    let reduceTodo = allTodos.filter((task) => task.id !== id);
    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
    toast.error("Task Deleted👍");
  };

  //complete function
  const handleComplete = (id) => {
    let completed = allTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: true };
      } else {
        return todo;
      }
    });
    localStorage.setItem("todolist", JSON.stringify(completed));
    setAllTodos(completed);
    toast.success("Task Completed Successfully😄");
  };

  useEffect(() => {
    let getTodo = JSON.parse(localStorage.getItem("todolist"));
    if (getTodo) {
      setAllTodos(getTodo);
    }
  }, []);

  return (
    <>

      <div className="container" style={{marginTop:"5%"}}>
        <h1>My Todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-item">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="todo-item">
              <label htmlFor="">Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="todo-item">
              <button type="button" className="my-btn" onClick={addTodo}>
                ADD
              </button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="btn-area">
              <button className={`btn2 ${todoState ===false && `active`}`} onClick={() => setTodoState(false)}>
                Pending
              </button>
            </div>
            <div className="btn-area">
              <button className={`btn2 ${todoState ===true && `active`}`} onClick={() => setTodoState(true)}>
                Completed
              </button>
            </div>
          </div>
          {allTodos.length===0 ? <p style={{textAlign:"center", marginTop:"20px"}}>No tasks Added🚫</p> : allTodos
            .filter((e) => e.status === todoState)
            .map((item, index) => {
              return (
                <Todos
                  key={index}
                  item={item}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                  todoState = {todoState}
                />
              );
            })}
        </div>
        <Toaster position="top-right" reverseOrder={false} />

      </div>
    </>
  );
}

export default App;
