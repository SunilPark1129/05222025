import React, { Component } from "react";
import "./styles/todo.style.css";
import {
  CompletedButton,
  EditButton,
  RemoveButton,
  UndoButton,
} from "./Buttons";

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  state = {
    isEditing: false,
    inputValue: this.props.item.title,
  };

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleEditClick() {
    // edit mode on|off
    this.setState((prev) => ({ isEditing: !prev.isEditing }));
    // set initial input value
    this.setState({ inputValue: this.props.item.title });
  }

  render() {
    const { isEditing, inputValue } = this.state;
    const { id, title, hasCompleted } = this.props.item;
    const editMode = isEditing ? "board__item--edit" : "";

    return (
      <li className={`board__item ${editMode}`} id={id}>
        {isEditing ? (
          <input value={inputValue} onChange={this.handleChange} />
        ) : (
          <p>{title}</p>
        )}
        <EditButton onClick={this.handleEditClick} />
        <RemoveButton />
        {hasCompleted ? <UndoButton /> : <CompletedButton />}
      </li>
    );
  }
}

export default Todo;
