import React, { Component } from "react";
import "./styles/submitTask.style.css";

class SubmitTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInput: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.taskInput.trim() === "") return;
    this.props.getInput(this.state.taskInput);
    this.setState({ taskInput: "" });
  }

  render() {
    return (
      <div className="todo__input-box">
        <input
          type="text"
          value={this.state.taskInput}
          onChange={(e) => this.setState({ taskInput: e.target.value })}
        />
        <button onClick={this.handleClick}>submit</button>
      </div>
    );
  }
}

export default SubmitTask;
