import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../models/task";
import { RootState } from "../store";
import { TASKS_FILTER_TYPE } from "../constants";

export interface SortMethod {
	key: number,
	on: string,
	direction: string
}

export interface TasksState {
  tasks: Task[];
  searchText: string;
  sortMethod: SortMethod;
  filterType: string;
}

const initialtasksState: TasksState = {
  tasks: [],
  searchText: "",
  sortMethod: {
    key: 1,
    on: "Name",
    direction: "(A - Z)",
  },
  filterType: TASKS_FILTER_TYPE.SHOW_ALL,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialtasksState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    completeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: true } : task
      );
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setSortMethod(state, action: PayloadAction<SortMethod>) {
      state.sortMethod = action.payload;
    },
    setFilterType(state, action: PayloadAction<string>) {
      state.filterType = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  if (state.tasks.filterType === TASKS_FILTER_TYPE.SHOW_COMPLETED) {
    return state.tasks.tasks.filter((t: { completed: any; }) => t.completed) // filter out the tasks that are not completed
  }
  if (state.tasks.filterType === TASKS_FILTER_TYPE.SHOW_PENDING) {
    return state.tasks.tasks.filter((t: { completed: any; }) => !t.completed) // filter out the tasks that are completed (filter out the tasks that are completed)
  }

  return state.tasks.tasks
} // selector

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;