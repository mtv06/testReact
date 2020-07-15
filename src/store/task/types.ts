export interface Task {
    id: number;
    title: string;
    description: string;
    expirationDate: Date;
    color: string;
    isCompleted: boolean;
}

export interface TaskState {
    tasks: Task[]
}

export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const COMPLETED_TASK = 'COMPLETED_TASK';
export const ACTIVE_TASK = 'ACTIVE_TASK';

export interface AddTaskAction {
    type: typeof ADD_TASK;
    payload: Task;
}

export interface EditTaskAction {
    type: typeof EDIT_TASK;
    payload: Task;
}

export interface DeleteTaskAction {
    type: typeof DELETE_TASK;
    meta: {
        id: number;
    }
}

export interface CompletedTaskAction {
    type: typeof COMPLETED_TASK;
    meta: {
        id: number;
    }
}

export interface ActiveTaskAction {
    type: typeof ACTIVE_TASK;
    meta: {
        id: number;
    }
}

export type TaskActionTypes =
    AddTaskAction |
    EditTaskAction |
    DeleteTaskAction |
    CompletedTaskAction |
    ActiveTaskAction