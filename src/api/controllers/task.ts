import API from "../axios";

type Task = {
    id: number;
    title: string;
    description: string;
    expirationDate: Date;
    color: string;
    isCompleted: boolean;
};

export const getTasks = async () =>
    await API.get<Task[]>(`/tasks`);

export const createTask = async (task: Task) =>
    await API.post<void>(`/task`, task);

export const updateTask = async (task: Task) =>
    await API.put<void>(`/task/${task.id}`, task);

export const isCompletedTask = async (id: number, status: boolean) =>
    await API.put<void>(`/task/${id}/is-completed`, status);

export const removeTask = async (id: number) =>
    await API.delete<void>(`/task/${id}`);
