import {
    TaskActionTypes,
    Task,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    COMPLETED_TASK,
    ACTIVE_TASK
} from "./types";

export function addTask(newTask: Task): TaskActionTypes {
    return {
        type: ADD_TASK,
        payload: newTask
    }
}

export function editTask(newTask: Task): TaskActionTypes {
    return {
        type: EDIT_TASK,
        payload: newTask
    }
}

export function deleteTask(id: number): TaskActionTypes {
    return {
        type: DELETE_TASK,
        meta: {
            id
        }
    }
}

export function completedTask(id: number): TaskActionTypes {
    return {
        type: COMPLETED_TASK,
        meta: {
            id
        }
    }
}

export function activeTask(id: number): TaskActionTypes {
    return {
        type: ACTIVE_TASK,
        meta: {
            id
        }
    }
}