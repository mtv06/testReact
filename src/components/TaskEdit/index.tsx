import React, { FC, SyntheticEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { Task } from "../../store/task/types";
import { editTask } from "../../store/task/actions";
import { Button, TitleForm } from "../../styled";
import styled from "styled-components";
import { updateTask } from "../../api/controllers/task";

interface TaskProps {
    currentTask: Task;
    isEditingTask: (isEdit: boolean) => void;
    checkTask: (task: Task) => void;
    className?: string;
}

const TaskEdit_: FC<TaskProps> = (
    {
        currentTask,
        isEditingTask,
        checkTask,
        className
    }) => {
    const dispatch = useDispatch()
    const [task, setTask] = useState<Task>({
        id: currentTask.id,
        title: currentTask.title,
        description: currentTask.description,
        expirationDate: currentTask.expirationDate,
        color: currentTask.color,
        isCompleted: currentTask.isCompleted
    });

    const handleSubmit = (): void => {
        isEditingTask(false);
        updateTask(task)
            .then(res => {
                if (res.status === 204) {
                    checkTask(task);
                    dispatch(editTask(task));
                } else {
                    console.error(`Error ${res.status}: ${res.statusText}` );
                }
            })
            .catch(error => {
                    console.error(error);
                }
            );
    }

    const onInputChange = (fieldName: string) => (
        e: SyntheticEvent<HTMLInputElement>
    ): void => {
        setTask({
            ...task,
            [fieldName]: e.currentTarget.value
        });
    }

    const onDateChange = (date: Date): void => {
        setTask({
            ...task,
            expirationDate: date
        });
    }

    return (
        <form
            className={className}
            onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            return false;
        }}>
            <TitleForm>Update Task</TitleForm>
            <div className="form-group">
                <input
                    type="text"
                    defaultValue={task.title}
                    onChange={onInputChange('title')}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    defaultValue={task.description}
                    onChange={onInputChange('description')}
                />
            </div>
            <DatePicker
                selected={new Date(task.expirationDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                    if (date != null)
                        onDateChange(date);
                }}
            />
            <Button>Submit</Button>
        </form>
    );
}

const TaskEdit = styled(TaskEdit_)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  
  input {
    width: 100%;
    height: 40px;
    color: grey;
  }
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container input {
    color: grey;
    width: 100%;
  }
`;

export default TaskEdit;