import {applyMiddleware, combineReducers, createStore} from 'redux';
import { taskReducers } from "./task/reducers";
import logger from 'redux-logger';

const rootReducer = combineReducers({
    task: taskReducers
})

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
)

export default store;