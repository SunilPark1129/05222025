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
    const { id, title, hasCompleted } = this.props.item;

    return (
      <li
        className={`board__item ${this.state.isEditing && "board__item--edit"}`}
        id={id}
      >
        <div className={this.state.isEditing ? "edit-active" : ""}>
          {this.state.isEditing ? (
            <input value={this.state.inputValue} onChange={this.handleChange} />
          ) : (
            <p>{title}</p>
          )}
        </div>
        <EditButton onClick={this.handleEditClick} />
        <RemoveButton />
        {hasCompleted ? <UndoButton /> : <CompletedButton />}
      </li>
    );
  }
}

export default Todo;
