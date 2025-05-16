export const initialState = { todos: [], isLoading: false };

export function todoReducer(state, action) {
  switch (action.type) {
    case "GET":
      return {
        ...state,
        todos: action.payload.sort((a, b) => b.lastUpdated - a.lastUpdated),
      };

    case "ADD":
      return { ...state, todos: [action.payload, ...state.todos] };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    case "UPDATE": {
      const newTodos = [...state.todos];
      const index = newTodos.findIndex(({ id }) => id === action.payload.id);
      newTodos[index] = action.payload;
      return {
        ...state,
        todos: newTodos.sort((a, b) => b.lastUpdated - a.lastUpdated),
      };
    }

    case "SET_LOADING":
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
}
