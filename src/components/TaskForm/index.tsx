import React, {FC, SyntheticEvent, useState} from "react";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";
import {Task} from "../../store/task/types";
import {addTask} from "../../store/task/actions";
import {Button, TitleForm} from "../../styled";
import styled from "styled-components";

interface TaskProps {
    tasks: Task[];
    checkTask: (task: Task) => void;
    className?: string;
}

const TaskForm_: FC<TaskProps> = (
    {
        tasks,
        checkTask,
        className
    }) => {
    const dispatch = useDispatch();
    const [task, setTask] = useState<Task>({
        id: 0,
        title: '',
        description: '',
        expirationDate: new Date(),
        color: '',
        isCompleted: false
    });

    const handleSubmit = (): void => {
        task.id = tasks.length + 1;
        checkTask(task);
        dispatch(addTask(task));
        setTask({
            ...task,
            title: '',
            description: ''
        });
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
            <TitleForm>Create Task</TitleForm>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter title"
                    value={task.title}
                    onChange={onInputChange('title')}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter description"
                    value={task.description}
                    onChange={onInputChange('description')}
                />
            </div>
            <DatePicker
                selected={task.expirationDate}
                dateFormat="dd.MM.yyyy"
                onChange={(date) => {
                    if (date != null)
                        onDateChange(date);
                }}
            />
            <Button>Submit</Button>
        </form>
    );
}

const TaskForm = styled(TaskForm_)`
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

export default TaskForm;