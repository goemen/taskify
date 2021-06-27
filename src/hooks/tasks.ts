import { useSelector } from "react-redux"
import { ITask } from "../models";
import { RootState } from "../store"
import { useUsersList } from "./users";

export const useTasksMap = () => {
    return useSelector((state: RootState) => state.tasks);
} 

export const useTasksList = (filter: (task: ITask) => boolean = (_) => true) => {
    const tasksMap = useTasksMap();

    return Object.keys(tasksMap).map(id => tasksMap[id]).filter(filter);
} 

export const useTasksCount = () => {
    return useUsersList().length;
}

export const useTask = (id: string) => {
    const tasksMap = useTasksMap();
    return tasksMap[id];
} 