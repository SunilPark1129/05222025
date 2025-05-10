import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import SubmitTask from "./components/SubmitTask";
import {
  getRequest,
  postRequest,
  removeRequest,
  updateRequest,
} from "./api/api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      isLoading: false,
    };

    this.getInput = this.getInput.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  // -------------------------- HTTP Request -------------------------- //
  componentDidMount() {
    this.setState({ isLoading: true });
    getRequest()
      .then((data) => {
        this.setState({ todos: data });
        this.setState({ isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  getInput(value) {
    const date = Date.now();
    this.setState({ isLoading: true });
    const payload = { title: value, hasCompleted: false, lastUpdated: date };

    postRequest(payload)
      .then((data) => {
        this.setState((prev) => ({ todos: [data, ...prev.todos] }));
        this.setState({ isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  updateItem({ payload, index }) {
    updateRequest(payload.id, payload).then(() => {
      this.setState((prev) => {
        const newTodos = [...prev.todos];
        newTodos[index] = payload;
        return {
          todos: newTodos.sort((a, b) => b.lastUpdated - a.lastUpdated),
        };
      });
    });
  }

  deleteItem(id) {
    removeRequest(id).then(() => {
      this.setState((prev) => ({
        todos: prev.todos.filter((item) => item.id !== id),
      }));
    });
  }
  // ------------------------------------------------------------------- //

  render() {
    return (
      <main>
        <div className="wrapper">
          <div className="todo__container">
            <SubmitTask getInput={this.getInput} />
            <Board
              todos={this.state.todos}
              isLoading={this.state.isLoading}
              editItem={this.editItem}
              updateItem={this.updateItem}
              deleteItem={this.deleteItem}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
