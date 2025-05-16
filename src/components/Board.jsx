import { useMemo } from "react";
import "./styles/board.style.css";
import Todo from "./Todo";
import { useTodoContext } from "../context/TodoContext";

function Board() {
  const { state } = useTodoContext();
  const { todos } = state;

  const tasks = useMemo(() => {
    const pendingTasks = todos.filter((item) => !item.hasCompleted);
    const completedTasks = todos.filter((item) => item.hasCompleted);
    return [
      {
        task: pendingTasks,
        label: "Pending Tasks",
        startIndex: 0,
      },
      {
        task: completedTasks,
        label: "Completed Tasks",
        startIndex: pendingTasks.length,
      },
    ];
  }, [todos]);

  return (
    <div className="board">
      {tasks.map(({ task, label, startIndex, length }) => (
        <section key={label} className="board__content">
          <h2>{label}</h2>
          <ul>
            {task.map((item, index) => (
              <Todo
                key={index + item.id}
                item={item}
                index={index + startIndex}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Board;
