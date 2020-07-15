import React, { FC } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { Task } from "../../store/task/types";
import { Button, Modal } from "react-bootstrap";
import Moment from "react-moment";

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
            <Modal.Body>
                <div>{currentTask.description}</div>
                <br />
                <Moment format="DD/MM/YYYY">{currentTask.expirationDate}</Moment>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskView;