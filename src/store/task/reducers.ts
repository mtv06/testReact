import {
    ADD_TASK,
    COMPLETED_TASK,
    DELETE_TASK,
    EDIT_TASK,
    ACTIVE_TASK,
    TaskActionTypes,
    TaskState
} from './types'

const initialState: TaskState = {
    tasks: []
}

export function taskReducers(
    state = initialState,
    action: TaskActionTypes
): TaskState {
    switch (action.type) {
        case ADD_TASK:
            return {
                tasks: [...state.tasks, action.payload]
            }
        case EDIT_TASK:
            return {
                tasks: state.tasks.map(
                    task =>
                        task.id === action.payload.id ?
                            {...task, title : action.payload.title,
                                description : action.payload.description }
                        : task)
            }
        case DELETE_TASK:
            return {
                tasks: state.tasks.filter(
                    task => task.id !== action.meta.id
                )
            }
        case COMPLETED_TASK:
            return {
                tasks: state.tasks.map(
                    task =>
                        task.id === action.meta.id ?
                            {...task, isCompleted : true } : task)
            }
        case ACTIVE_TASK:
            return {
                tasks: state.tasks.map(
                    task =>
                        task.id === action.meta.id ?
                            {...task, isCompleted : false } : task)
            }
        default:
            return state;
    }

}