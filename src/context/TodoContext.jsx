import { createContext, useContext, useReducer } from "react";
import { initialState, todoReducer } from "../reducer/todoReducter";

const TodoStateContext = createContext();

export function useTodoContext() {
  return useContext(TodoStateContext);
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoStateContext.Provider>
  );
}
