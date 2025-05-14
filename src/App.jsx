import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import SubmitTask from "./components/SubmitTask";
import {
  getRequest,
  postRequest,
  removeRequest,
  updateRequest,
} from "./api/api";
import Loading from "./components/Loading";

// requirement: useCallback is applied in this component
function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(true);

  // -------------------------- HTTP Request -------------------------- //
  useEffect(() => {
    setIsLoading(true);
    getRequest()
      .then((data) => setTodos(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddTodo = useCallback((value) => {
    setIsLoading(true);
    const date = Date.now();
    const payload = { title: value, hasCompleted: false, lastUpdated: date };

    postRequest(payload)
      .then((data) => setTodos((prev) => [data, ...prev]))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const updateItem = useCallback(({ payload, index }) => {
    setIsLoading(true);
    updateRequest(payload.id, payload)
      .then(() => {
        setTodos((prev) => {
          const newTodos = [...prev];
          newTodos[index] = payload;
          return newTodos.sort((a, b) => b.lastUpdated - a.lastUpdated);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteItem = useCallback((id) => {
    setIsLoading(true);
    removeRequest(id)
      .then(() => setTodos((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  // ------------------------------------------------------------------- //

  return (
    <main>
      <div className="wrapper">
        <div className="todo__container">
          {isLoading && <Loading />}
          <SubmitTask handleAddTodo={handleAddTodo} />
          <Board
            todos={todos}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        </div>
        {/* this button triggers a re-render to test if useMemo arrays are being recalculated in the child component */}
        <button onClick={() => setRenderTrigger((prev) => !prev)}>
          Re-render trigger
        </button>
      </div>
    </main>
  );
}

export default App;
