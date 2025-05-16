import React, { useRef } from "react";
import "./styles/submitTask.style.css";
import useTodoActions from "../hooks/useTodoActions";

function SubmitTask() {
  const { addTodos } = useTodoActions();
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current.value.trim() === "") return;
    const { value } = inputRef.current;
    const date = Date.now();
    const payload = { title: value, hasCompleted: false, lastUpdated: date };

    addTodos(payload);

    inputRef.current.value = "";
  };

  return (
    <div className="todo__input-box">
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>submit</button>
    </div>
  );
}

export default SubmitTask;
