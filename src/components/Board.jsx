import React, { Component } from "react";
import "./styles/board.style.css";
import Todo from "./Todo";
import Loading from "./Loading";

class Board extends Component {
  constructor(props) {
    super(props);
    this.listClickHandle = this.listClickHandle.bind(this);
  }

  // event delegation
  listClickHandle(e) {
    if (e.target.classList[0] !== "todo__btn") return;
    const targetClass = e.target.classList[1];
    const targetId = e.target.closest("li").id;
    const targetIndex = this.props.todos.findIndex(
      (item) => item.id === targetId
    );

    if (targetClass === "todo__btn--edit") {
      // if edit mode is not on -> return
      const sibling = e.target.previousSibling;
      if (sibling.className !== "edit-active") return;

      // if input is empty || didn't change -> return
      if (
        sibling.children[0].value.trim() === "" ||
        sibling.children[0].value === this.props.todos[targetIndex].title
      )
        return;

      const payload = {
        ...this.props.todos[targetIndex],
        title: sibling.children[0].value,
      };
      this.props.updateItem({ payload, index: targetIndex });
    } else if (targetClass === "todo__btn--remove") {
      this.props.deleteItem(targetId);
    } else if (
      targetClass === "todo__btn--completed" ||
      targetClass === "todo__btn--undo"
    ) {
      // flip hasCompleted boolean
      // renew a lastUpdated to sort
      const payload = {
        ...this.props.todos[targetIndex],
        hasCompleted: !this.props.todos[targetIndex].hasCompleted,
        lastUpdated: Date.now(),
      };
      const data = { payload, index: targetIndex };
      this.props.updateItem(data);
    }
  }

  render() {
    const pendingTasks = [];
    const completedTasks = [];
    for (let task of this.props.todos) {
      if (!task.hasCompleted) pendingTasks.push(task);
      else completedTasks.push(task);
    }

    return (
      <>
        {this.props.isLoading && <Loading />}
        <div className="board">
          <section className="board__content">
            <h2>Pending Tasks</h2>
            <ul onClick={this.listClickHandle}>
              {pendingTasks.map((item) => (
                <Todo
                  key={item.id}
                  item={item}
                  updateHandlers={this.updateHandlers}
                />
              ))}
            </ul>
          </section>

          <section className="board__content">
            <h2>Completed Tasks</h2>
            <ul onClick={this.listClickHandle}>
              {completedTasks.map((item) => (
                <Todo
                  key={item.id}
                  item={item}
                  updateHandlers={this.updateHandlers}
                />
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  }
}

export default Board;
