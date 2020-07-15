import {
    AddTaskAction,
    EditTaskAction,
    DeleteTaskAction,
    CompletedTaskAction,
    ActiveTaskAction,
    Task,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    COMPLETED_TASK,
    ACTIVE_TASK
} from "./types";

export function addTask(newTask: Task): AddTaskAction {
    return {
        type: ADD_TASK,
        payload: newTask
    }
}

export function editTask(newTask: Task): EditTaskAction {
    return {
        type: EDIT_TASK,
        payload: newTask
    }
}

export function deleteTask(id: number): DeleteTaskAction {
    return {
        type: DELETE_TASK,
        meta: {
            id
        }
    }
}

export function completedTask(id: number): CompletedTaskAction {
    return {
        type: COMPLETED_TASK,
        meta: {
            id
        }
    }
}

export function activeTask(id: number): ActiveTaskAction {
    return {
        type: ACTIVE_TASK,
        meta: {
            id
        }
    }
}