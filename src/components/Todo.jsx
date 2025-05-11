import React, { Component, createRef } from "react";
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
    this.inputRef = createRef();
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

  // editing mode is on -> focus input
  componentDidUpdate(prevProp, prevState) {
    if (this.state.isEditing && prevState.isEditing !== this.state.isEditing) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { isEditing, inputValue } = this.state;
    const { id, title, hasCompleted } = this.props.item;
    const editMode = isEditing ? "board__item--edit" : "";

    return (
      <li className={`board__item ${editMode}`} id={id}>
        {isEditing ? (
          <input
            value={inputValue}
            ref={this.inputRef}
            onChange={this.handleChange}
          />
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
