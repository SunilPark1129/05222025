import React, { useRef } from "react";
import "./styles/submitTask.style.css";

function SubmitTask({ handleAddTodo }) {
  const inputRef = useRef(null);
  function handleClick() {
    if (inputRef.current.value.trim() === "") return;
    handleAddTodo(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <div className="todo__input-box">
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>submit</button>
    </div>
  );
}

export default SubmitTask;
