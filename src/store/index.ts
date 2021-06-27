import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { TasksStateType } from "./reducers/tasks";
const LOCALSTORAGE_TASKS = 'taskify.tasks';

/**
 * Load tasks from localstorage
 * @returns TasksStateType
 */
const loadInitialTasks = (): TasksStateType => {
    if (!localStorage.getItem(LOCALSTORAGE_TASKS)) {
        return {};
    }

    return (JSON.parse(localStorage.getItem(LOCALSTORAGE_TASKS)!).tasks || {}) as TasksStateType;
}

console.log(loadInitialTasks())

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
      tasks: loadInitialTasks()
  }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Subscribe and save data to localstorage
store.subscribe(() => {
    localStorage.setItem(LOCALSTORAGE_TASKS, JSON.stringify(store.getState()))
});

export default store;
