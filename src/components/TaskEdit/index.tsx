import React, { FC, SyntheticEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { Task } from "../../store/task/types";
import { editTask } from "../../store/task/actions";
import { Button, TitleForm } from "../../styled";
import { Form } from "../../styled/shared";

interface TaskProps {
    currentTask: Task;
    isEditingTask: (isEdit: boolean) => void;
    checkTask: (task: Task) => void;
}

const TaskEdit: FC<TaskProps> = (
    {
        currentTask,
        isEditingTask,
        checkTask
    }) => {
    const dispatch = useDispatch()
    const [task, setTask] = useState<Task>({
        id: currentTask.id,
        title: currentTask.title,
        description: currentTask.description,
        expirationDate: currentTask.expirationDate,
        color: currentTask.color,
        isCompleted: currentTask.isCompleted
    })

    const handleEdit = (): void => {
        isEditingTask(false);
        checkTask(task)
        dispatch(editTask(task))
    }

    const onInputChange = (fieldName: string) => (
        e: SyntheticEvent<HTMLInputElement>
    ): void => {
        setTask({
            ...task,
            [fieldName]: e.currentTarget.value
        })
    }

    const onDateChange = (date: Date): void => {
        setTask({
            ...task,
            expirationDate: date
        })
    }

    return (
        <Form>
            <TitleForm>Update Task</TitleForm>
            <div className="form-group">
                <input
                    type="text"
                    defaultValue={currentTask.title}
                    onChange={onInputChange('title')}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    defaultValue={currentTask.description}
                    onChange={onInputChange('description')}
                />
            </div>
            <DatePicker
                selected={currentTask.expirationDate}
                dateFormat="dd.MM.yyyy"
                onChange={(date) => {
                    if (date != null)
                        onDateChange(date);
                }}
            />
            <Button onClick={() => handleEdit()}>Submit</Button>
        </Form>
    )
}

export default TaskEdit;