import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { AddTaskAction, Task } from "../../store/task/types";
import { addTask } from "../../store/task/actions";
import { createTask } from "../../api/controllers/task";
import { Dispatch } from "redux";
import { Form, Button, Modal} from "react-bootstrap";

interface TaskProps {
    tasks: Task[];
    checkTask: (task: Task) => void;
    pushNotification: (status: string) => void;
    show: boolean;
    handleClose: () => void;
}

const TaskForm: FC<TaskProps> = (
    {
        tasks,
        checkTask,
        pushNotification,
        show,
        handleClose
    }) => {
    const dispatch = useDispatch<Dispatch<AddTaskAction>>();
    const [task, setTask] = useState<Task>({
        id: 0,
        title: '',
        description: '',
        expirationDate: new Date(),
        color: '',
        isCompleted: false
    });

    const handleSubmit = (): void => {
        createTask(task)
            .then(res => {
                if (res.status === 201) {
                    task.id = tasks.length + 1;
                    checkTask(task);
                    dispatch(addTask(task));
                } else {
                    pushNotification(`Failed to create task, status - ${res.status}: ${res.statusText}`);
                }
            })
            .catch(error => {
                pushNotification(error);
            });
        setTask({
            ...task,
            title: '',
            description: '',
            expirationDate: new Date()
        });
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
                <Modal.Title>Create Task</Modal.Title>
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
                            placeholder="Enter title"
                            value={task.title}
                            onChange={onInputChange('title')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={task.description}
                            onChange={onInputChange('description')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            selected={task.expirationDate}
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

export default TaskForm;