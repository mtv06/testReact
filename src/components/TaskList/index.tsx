import React, { FC, useCallback, useEffect, useState } from "react";
import { Task } from "../../store/task/types";
import { useDispatch } from "react-redux";
import { activeTask, completedTask, deleteTask } from "../../store/task/actions";
import TaskItem from "../TaskItem";
import update from 'immutability-helper'

interface TaskProps {
    tasks: Task[];
    editTask: (newTask: Task) => void;
    isEditingTask: (isEdit: boolean) => void;
    handleShow: () => void;
    path: String;
}

const TaskList: FC<TaskProps> = (
    {
        tasks,
        editTask,
        isEditingTask,
        handleShow,
        path
    }) => {
    const dispatch = useDispatch();
    const [tasksDnD, setTasksDnD] = useState<Task[]>(tasks);

    useEffect(() => {
        setTasksDnD(tasks);
    }, [tasks]);

    const handleEdit = (newTask: Task): void => {
        if (!newTask.isCompleted) {
            editTask(newTask);
            isEditingTask(true);
        } else alert('isCompleted');
    }

    const handleDelete = (id: number): void => {
        if (window.confirm(`Are you sure?`)) {
            dispatch(deleteTask(id));
        }
    }

    const handleActive = (id: number): void => {
        if (window.confirm(`Are you sure?`)) {
            dispatch(activeTask(id));
        }
    }

    const handleCompleted = (id: number): void => {
        if (window.confirm(`Are you sure?`)) {
            dispatch(completedTask(id));
        }
    }

    const handleView = (viewTask: Task): void => {
        editTask(viewTask);
        handleShow();
    }

    const moveTask = useCallback(
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