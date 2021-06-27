export type WorkFlowStatus = 'todo' | 'inprogress' | 'done';

export const WorkFlowStatusLabels: Map<WorkFlowStatus, string> = new Map([
    ['todo', 'To do'],
    ['inprogress', 'In progress'],
    ['done', 'Done']
])

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: WorkFlowStatus;
    dueDate?: Date | string;
    assignedTo: string | IUser;
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}