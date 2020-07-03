import React, { FC, useRef } from "react";
import { Task } from "../../store/task/types";
import Moment from 'react-moment';
import { TitleTask } from "../../styled";
import styled from "styled-components/macro";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";

const TaskTypes = {
    TASK: 'task'
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

interface TaskItemProps {
    id: number;
    index: number;
    task: Task;
    handleView: (task: Task) => void;
    handleEdit: (task: Task) => void;
    handleDelete: (id: number) => void;
    handleCompleted: (id: number) => void;
    handleActive: (id: number) => void;
    moveTask: (dragIndex: number, hoverIndex: number) => void;
    className?: string;
}

const Button = styled.button`
  background: white;
  color: ${props => props.color};
  font-size: 1.1em;
  margin-top: 0.7em;
  margin-right: 0.2em;
  padding: 0.25em 1em;
  border: 2px solid ${props => props.color};
  border-radius: 3px;
`;

const TaskItem_: FC<TaskItemProps> = (
    {
        id,
        index,
        task,
        handleView,
        handleEdit,
        handleDelete,
        handleCompleted,
        handleActive,
        moveTask,
        className
    }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: TaskTypes.TASK,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveTask(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        item: { type: TaskTypes.TASK, id, index }
    });

    drag(drop(ref));

    return (
        <div className={className} ref={ref} key={task.id}>
            <div className="row">
                <div className="col-md-6" onClick={() => handleView(task)}>
                    <TitleTask>{task.title}</TitleTask>
                    <Moment format="YYYY/MM/DD">{task.expirationDate.toDateString()}</Moment>
                </div>
                <div className="col-md-6">
                    <Button color="#28a745" onClick={() => handleEdit(task)}>Edit</Button>
                    <Button color="#dc3545" onClick={() => handleDelete(task.id)}>Delete</Button>
                    <Button color="#007bff" onClick={() => handleCompleted(task.id)}>Completed</Button>
                    <Button color="#17a2b8" onClick={() => handleActive(task.id)}>Active</Button>
                </div>
            </div>
        </div>
    );
}

const TaskItem = styled(TaskItem_)`
  background: white;  
  color: ${props => props.task.color};
  text-decoration: ${props => props.task.isCompleted ? "line-through" : "none"};
  margin: 15px 10px;
  border: 1px dashed ${props => props.task.color};
  padding: 12px 6px;
  border-radius: 5px;
  cursor: move;
`;

export default TaskItem;