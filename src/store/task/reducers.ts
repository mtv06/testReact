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
                    content =>
                        content.id === action.payload.id ?
                            {...content, title : action.payload.title,
                                description : action.payload.description }
                        : content)
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
                    content =>
                        content.id === action.meta.id ?
                            {...content, isCompleted : true } : content)
            }
        case ACTIVE_TASK:
            return {
                tasks: state.tasks.map(
                    content =>
                        content.id === action.meta.id ?
                            {...content, isCompleted : false } : content)
            }
        default:
            return state
    }

}