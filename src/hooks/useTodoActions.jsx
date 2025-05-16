import React, { useCallback } from "react";
import { useTodoContext } from "../context/TodoContext";
import {
  getRequest,
  postRequest,
  removeRequest,
  updateRequest,
} from "../api/api";

function useTodoActions() {
  const { dispatch } = useTodoContext();

  const getTodos = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    getRequest()
      .then((data) => dispatch({ type: "GET", payload: data }))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  }, []);

  const addTodos = useCallback((payload) => {
    dispatch({ type: "SET_LOADING", payload: true });
    postRequest(payload)
      .then((data) => dispatch({ type: "ADD", payload: data }))
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  }, []);

  const updateTodo = useCallback((payload) => {
    dispatch({ type: "SET_LOADING", payload: true });
    updateRequest(payload.id, payload)
      .then(() => dispatch({ type: "UPDATE", payload }))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    removeRequest(id)
      .then(() => dispatch({ type: "DELETE", payload: id }))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  }, []);

  return {
    getTodos,
    addTodos,
    updateTodo,
    deleteTodo,
  };
}

export default useTodoActions;
