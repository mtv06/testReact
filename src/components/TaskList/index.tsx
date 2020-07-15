import React, { FC, useCallback, useEffect, useState } from "react";
import { TaskActionTypes, Task } from "../../store/task/types";
import { useDispatch } from "react-redux";
import { activeTask, completedTask, deleteTask } from "../../store/task/actions";
import TaskItem from "../TaskItem";
import update from 'immutability-helper'
import { isCompletedTask, removeTask } from "../../api/controllers/task";
import { Dispatch } from "redux";

interface TaskProps {
    tasks: Task[];
    editTask: (task: Task) => void;
    viewTask: (task: Task) => void;
    handleShowFormView: () => void;
    handleShowFormEdit: () => void;
    pushNotification: (status: string) => void;
    path: string;
}

const TaskList: FC<TaskProps> = (
    {
        tasks,
        editTask,
        viewTask,
        handleShowFormView,
        handleShowFormEdit,
        pushNotification,
        path
    }) => {
    const dispatch = useDispatch<Dispatch<TaskActionTypes>>();
    const [tasksDnD, setTasksDnD] = useState<Task[]>(tasks);

    useEffect(() => {
        setTasksDnD(tasks);
    }, [tasks]);

    const handleView = (task: Task): void => {
        viewTask(task);
        handleShowFormView();
    }

    const handleEdit = (task: Task): void => {
        if (!task.isCompleted) {
            editTask(task);
            handleShowFormEdit();
        } else
            alert('It is impossible to edit the completed task');
    }

    const handleDelete = (id: number): void => {
        if (window.confirm(`Are you sure?`)) {
            removeTask(id)
                .then(res => {
                    if (res.status === 204) {
                        dispatch(deleteTask(id));
                    } else {
                        pushNotification(`Failed to removed task, status - ${res.status}: ${res.statusText}`);
                    }
                })
                .catch(error => {
                    pushNotification(error);
                });
        }
    }

    const handleActive = (id: number): void => {
        if (window.confirm(`Are you sure?`)) {
            isCompletedTask(id, false)
                .then(res => {
                    if (res.status === 204) {
                        dispatch(activeTask(id));
                    } else {
                        pushNotification(`Failed to actived task, status - ${res.status}: ${res.statusText}`);
                    }
                })
                .catch(error => {
                    pushNotification(error);
                });
        }
    }

    const handleCompleted = (id: number): void => {
        if (window.confirm(`Are you sure?`)) {
            isCompletedTask(id, true)
                .then(res => {
                    if (res.status === 204) {
                        dispatch(completedTask(id));
                    } else {
                        pushNotification(`Failed to mark task as completed, status - ${res.status}: ${res.statusText}`);
                    }
                })
                .catch(error => {
                    pushNotification(error);
                });
        }
    }

    const moveTask =  useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard = tasksDnD[dragIndex];
            setTasksDnD(
                update(tasksDnD, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            );
        },
        [tasksDnD],
    );

    const renderTask = (task: Task, index: number) => {
        return (
            <TaskItem
                key={task.id}
                index={index}
                id={task.id}
                task={task}
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleCompleted={handleCompleted}
                handleActive={handleActive}
                moveTask={moveTask}
            />
        );
    }

    return (
        <div className="container">
            {tasksDnD.filter(task => {
                switch (path) {
                    case '/all':
                        return tasks
                    case '/active':
                        return !task.isCompleted
                    case '/completed':
                        return task.isCompleted
                    default:
                        return tasks
                }
            }).map((task, i) => (
                renderTask(task, i)
            ))}
        </div>
    );
}

export default TaskList;