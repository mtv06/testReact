import { combineReducers, createStore } from 'redux';
import { taskReducers } from "./task/reducers";

const rootReducer = combineReducers({
    task: taskReducers
})

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
    rootReducer
)

export default store;