import React, { memo, useEffect, useRef, useState } from "react";
import "./styles/todo.style.css";
import {
  CompletedButton,
  EditButton,
  RemoveButton,
  UndoButton,
} from "./Buttons";
import useTodoActions from "../hooks/useTodoActions";

function Todo({ item, index }) {
  const { title, id, hasCompleted } = item;
  const { updateTodo, deleteTodo } = useTodoActions();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef -> focusing
    if (isEditing && inputRef.current) {
      // set initial input value
      inputRef.current.value = title;
      inputRef.current.focus();
    }
  }, [isEditing]);

  // HTTP PATCH edit title
  function handleEditClick() {
    if (isEditing) {
      const { value } = inputRef.current;
      if (value.trim() !== "" && value !== item.title) {
        const payload = { ...item, title: value };
        updateTodo(payload);
      }
    }

    // edit mode on|off
    setIsEditing((prev) => !prev);
  }

  // HTTP DELETE
  function handleRemoveClick() {
    deleteTodo(id);
  }

  // HTTP PATCH hasCompleted
  function handleCompleteClick() {
    const payload = {
      ...item,
      hasCompleted: !hasCompleted,
      lastUpdated: Date.now(),
    };
    updateTodo(payload);
  }

  const editMode = isEditing ? "board__item--edit" : "";

  return (
    <li className={`board__item ${editMode}`} id={id}>
      {isEditing ? <input ref={inputRef} /> : <p>{title}</p>}
      <EditButton onClick={handleEditClick} />
      <RemoveButton onClick={handleRemoveClick} />
      {hasCompleted ? (
        <UndoButton onClick={handleCompleteClick} />
      ) : (
        <CompletedButton onClick={handleCompleteClick} />
      )}
    </li>
  );
}

export default Todo;
