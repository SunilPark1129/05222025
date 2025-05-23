import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  removeRequest,
  updateRequest,
} from "../../api/api";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchGetTodos = createAsyncThunk(
  "todos/fetchGetTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest();
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCreateTodo = createAsyncThunk(
  "todos/fetchCreateTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchRemoveTodo = createAsyncThunk(
  "todos/fetchRemoveTodo",
  async (id, { rejectWithValue }) => {
    try {
      await removeRequest(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUpdateTodo = createAsyncThunk(
  "todos/fetchUpdateTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateRequest(payload.id, payload);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      // HTTP GET
      .addCase(fetchGetTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload.sort(
          (a, b) => b.lastUpdated - a.lastUpdated
        );
      })
      .addCase(fetchGetTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // HTTP POST
      .addCase(fetchCreateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(fetchCreateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // HTTP DELETE
      .addCase(fetchRemoveTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRemoveTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(fetchRemoveTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // HTTP UPDATE
      .addCase(fetchUpdateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const newTodos = [...state.todos];
        const index = newTodos.findIndex(({ id }) => id === action.payload.id);
        newTodos[index] = action.payload;
        state.todos = newTodos.sort((a, b) => b.lastUpdated - a.lastUpdated);
      })
      .addCase(fetchUpdateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = todosSlice.actions;

export default todosSlice.reducer;
