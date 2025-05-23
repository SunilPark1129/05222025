import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import SubmitTask from "./components/SubmitTask";
import Loading from "./components/Loading";
import { fetchGetTodos } from "./features/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.todos);

  // get initial todo list
  useEffect(() => {
    dispatch(fetchGetTodos());
  }, []);

  return (
    <main>
      <div className="wrapper">
        <div className="todo__container">
          {isLoading && <Loading />}
          <SubmitTask />
          <Board />
        </div>
      </div>
    </main>
  );
}

export default App;
