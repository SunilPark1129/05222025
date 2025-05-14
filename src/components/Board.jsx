import { useMemo } from "react";
import "./styles/board.style.css";
import Todo from "./Todo";

// requirement: useMemo is applied in this component
function Board({ todos, updateItem, deleteItem }) {
  // event delegation
  function listClickHandle(e) {
    if (e.target.classList[0] !== "todo__btn") return;
    const targetClass = e.target.classList[1];
    const targetId = e.target.closest("li").id;
    const targetIndex = todos.findIndex((item) => item.id === targetId);

    if (targetClass === "todo__btn--edit") {
      // if edit mode is not on -> return
      const sibling = e.target.previousSibling;
      if (e.target.closest("li").classList[1] !== "board__item--edit") return;

      // if input is empty || didn't change -> return
      if (
        sibling.value.trim() === "" ||
        sibling.value === todos[targetIndex].title
      )
        return;

      const payload = {
        ...todos[targetIndex],
        title: sibling.value,
      };
      updateItem({ payload, index: targetIndex });
    } else if (targetClass === "todo__btn--remove") {
      deleteItem(targetId);
    } else if (
      targetClass === "todo__btn--completed" ||
      targetClass === "todo__btn--undo"
    ) {
      // flip hasCompleted boolean
      // renew a lastUpdated to sort
      const payload = {
        ...todos[targetIndex],
        hasCompleted: !todos[targetIndex].hasCompleted,
        lastUpdated: Date.now(),
      };
      const data = { payload, index: targetIndex };
      updateItem(data);
    }
  }

  // --------------------- render check ------------------------ //
  console.log(1, "board component rendered");

  // check if the values are recalculated when clicking re-render trigger button from parent
  const pendingTasks = useMemo(() => {
    console.log(2, "pendingTasks recalculated");
    return todos.filter((item) => !item.hasCompleted);
  }, [todos]);

  const completedTasks = useMemo(() => {
    console.log(3, "completedTasks recalculated");
    return todos.filter((item) => item.hasCompleted);
  }, [todos]);

  const tasks = useMemo(() => {
    console.log(4, "task array recalculated");
    return [
      { task: pendingTasks, label: "Pending Tasks" },
      { task: completedTasks, label: "Completed Tasks" },
    ];
  }, [pendingTasks, completedTasks]);
  // ----------------------------------------------------------- //

  return (
    <div className="board">
      {tasks.map(({ task, label }) => (
        <section key={label} className="board__content">
          <h2>{label}</h2>
          <ul onClick={listClickHandle}>
            {task.map((item) => (
              <Todo key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Board;
