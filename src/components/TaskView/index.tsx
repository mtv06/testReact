import React, { FC } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import {Task} from "../../store/task/types";
import {Button, Modal} from "react-bootstrap";

interface TaskProps {
    currentTask: Task;
    show: boolean;
    handleClose: () => void;
}

const TaskView: FC<TaskProps> = (
    {
        currentTask,
        show,
        handleClose
    }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentTask.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{currentTask.description}</Modal.Body>
            <Modal.Body>{currentTask.expirationDate.toDateString()}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskView;