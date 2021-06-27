import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { ITask, WorkFlowStatus } from "../../models";
import omit from "lodash/omit";

interface ISetTaskStatusActionPayload {
  taskId: string;
  nextStatus: WorkFlowStatus;
}

interface IAssignTaskPayload {
  taskId: string;
  assignTo: string;
}

export type TasksStateType = { [key: string]: ITask };

interface ITasksReducerActions extends SliceCaseReducers<TasksStateType> {
  add: CaseReducer<TasksStateType, PayloadAction<ITask>>;
  update: CaseReducer<TasksStateType, PayloadAction<ITask>>;
  delete: CaseReducer<TasksStateType, PayloadAction<string>>;
  assign: CaseReducer<TasksStateType, PayloadAction<IAssignTaskPayload>>;
  updateTaskStatus: CaseReducer<TasksStateType, PayloadAction<ISetTaskStatusActionPayload>>;
}

export const tasksSlice = createSlice<TasksStateType, ITasksReducerActions, "tasks">({
  name: "tasks",
  initialState: {},
  reducers: {
    /**
     * Add new task
     * @param state => current tasks map state
     * @param action => {payload: ITask}
     * @returns state with new task
     */
    add: (state: TasksStateType, action: PayloadAction<ITask>) => {
      return { ...state, [action.payload.id]: action.payload };
    },
    /**
     * Update a task
     * @param state => current tasks map state
     * @param action => {payload: ITask}
     * @returns state with update task
     */
    update: (state: TasksStateType, action: PayloadAction<ITask>) => {
      return { ...state, [action.payload.id]: action.payload };
    },
    /**
     * Delete a task
     * @param state => current tasks map state
     * @param action => {payload = taskId}
     * @returns state without deleted task
     */
    delete: (state: TasksStateType, action: PayloadAction<string>) => {
      return omit(state, action.payload);
    },
    /**
     * Assign a task to a user
     * @param state => current tasks map state
     * @param action => {payload {taskId, assignTo}}
     * @returns state with the task assigned to the user
     */
    assign: (
      state: TasksStateType,
      action: PayloadAction<IAssignTaskPayload>
    ) => {
      return {
        ...state,
        [action.payload.taskId]: {
          ...state[action.payload.taskId],
          assignedTo: action.payload.assignTo,
        },
      };
    },
    /**
     * Change status of task
     * @param state => current tasks map state
     * @param action => {payload {taskId, newStatus}}
     * @returns state with the task transitioned to the new status
     */
    updateTaskStatus: (
      state: TasksStateType,
      action: PayloadAction<ISetTaskStatusActionPayload>
    ) => {
      return {
        ...state,
        [action.payload.taskId]: {
          ...state[action.payload.taskId],
          status: action.payload.nextStatus,
        },
      };
    },
  },
});

export const Tasks = tasksSlice.actions;
