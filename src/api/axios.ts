import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import { mockTasksData } from "./mock/mockTasksData";

const API = axios.create({
    baseURL: process.env.BASE_PATH,
    timeout: 5000,
    responseType: 'json',
});

const mock = new MockAdapter(API);

mock.onGet(`/tasks`).reply(200, mockTasksData);
mock.onPost(`/task`).reply(201);
mock.onPut(/\/task\/\d+/).reply(204);
mock.onPut(/\/task\/\d+\/is-completed/).reply(204);
mock.onDelete(/\/task\/\d+/).reply(204);

export default API;
