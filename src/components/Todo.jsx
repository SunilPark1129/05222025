import React, { memo, useEffect, useRef, useState } from "react";
import "./styles/todo.style.css";
import {
  CompletedButton,
  EditButton,
  RemoveButton,
  UndoButton,
} from "./Buttons";
import { fetchRemoveTodo, fetchUpdateTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";

function Todo({ item }) {
  const dispatch = useDispatch();
  const { title, id, hasCompleted } = item;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  // when edit mode is on
  useEffect(() => {
    if (isEditing && inputRef.current) {
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
        dispatch(fetchUpdateTodo(payload));
      }
    }

    // edit input title mode on|off
    setIsEditing((prev) => !prev);
  }

  // HTTP DELETE
  function handleRemoveClick() {
    dispatch(fetchRemoveTodo(id));
  }

  // HTTP PATCH hasCompleted
  function handleCompleteClick() {
    const payload = {
      ...item,
      hasCompleted: !hasCompleted,
      lastUpdated: Date.now(),
    };
    dispatch(fetchUpdateTodo(payload));
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

export default memo(Todo);
