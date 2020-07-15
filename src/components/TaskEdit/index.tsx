import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { EditTaskAction, Task } from "../../store/task/types";
import { editTask } from "../../store/task/actions";
import { updateTask } from "../../api/controllers/task";
import { Dispatch } from "redux";
import { Form, Modal, Button } from "react-bootstrap";

interface TaskProps {
    currentTask: Task;
    checkTask: (task: Task) => void;
    pushNotification: (status: string) => void;
    show: boolean;
    handleClose: () => void;
}

const TaskEdit: FC<TaskProps> = (
    {
        currentTask,
        checkTask,
        pushNotification,
        show,
        handleClose
    }) => {
    const dispatch = useDispatch<Dispatch<EditTaskAction>>()
    const [task, setTask] = useState<Task>({
        id: currentTask.id,
        title: currentTask.title,
        description: currentTask.description,
        expirationDate: currentTask.expirationDate,
        color: currentTask.color,
        isCompleted: currentTask.isCompleted
    });

    const handleSubmit = (): void => {
        updateTask(task)
            .then(res => {
                if (res.status === 204) {
                    checkTask(task);
                    dispatch(editTask(task));
                } else {
                    pushNotification(`Failed to update task, status - ${res.status}: ${res.statusText}`);
                }
            })
            .catch(error => {
                pushNotification(error);
            })
            .finally(() => {
                handleClose();
            })
    }

    const onInputChange = (fieldName: string) => (
        e: React.ChangeEvent<HTMLInputElement>
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={(event:{}) => {
                        const e = event as React.ChangeEvent<HTMLInputElement>;
                        e.preventDefault();
                        handleSubmit();
                        handleClose();
                        return false;
                    }}
                >
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={currentTask.title}
                            onChange={onInputChange('title')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={currentTask.description}
                            onChange={onInputChange('description')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            selected={new Date(currentTask.expirationDate)}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                if (date != null)
                                    onDateChange(date);
                            }}
                        />
                    </Form.Group>
                    <div className="modal-button">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="primary" type="submit">
                            Save changes
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default TaskEdit;