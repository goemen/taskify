import { combineReducers } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasks";
import { usersSlice } from "./users";

export default combineReducers({
    tasks: tasksSlice.reducer,
    users: usersSlice.reducer
})