import React, { memo, useEffect, useRef, useState } from "react";
import "./styles/todo.style.css";
import {
  CompletedButton,
  EditButton,
  RemoveButton,
  UndoButton,
} from "./Buttons";

// requirement: memo is applied in this component
function Todo({ item: { title, id, hasCompleted } }) {
  // test if this log appears when hasCompleted is updated
  // -> it doesn't re-render sibling components because of React.memo
  console.log(`Title: ${title}`);

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      // set initial input value
      inputRef.current.value = title;
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleEditClick() {
    // edit mode on|off
    setIsEditing((prev) => !prev);
  }

  const editMode = isEditing ? "board__item--edit" : "";

  return (
    <li className={`board__item ${editMode}`} id={id}>
      {isEditing ? <input ref={inputRef} /> : <p>{title}</p>}
      <EditButton onClick={handleEditClick} />
      <RemoveButton />
      {hasCompleted ? <UndoButton /> : <CompletedButton />}
    </li>
  );
}

export default memo(Todo);
