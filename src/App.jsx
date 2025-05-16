import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import SubmitTask from "./components/SubmitTask";
import Loading from "./components/Loading";
import { useTodoContext } from "./context/TodoContext";
import useTodoActions from "./hooks/useTodoActions";

function App() {
  const { state } = useTodoContext();
  const { isLoading } = state;
  const { getTodos } = useTodoActions();

  useEffect(() => {
    getTodos();
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
