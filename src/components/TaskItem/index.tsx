import React, { FC, useRef } from "react";
import { Task } from "../../store/task/types";
import Moment from 'react-moment';
import { TitleTask } from "../../styled";
import styled from "styled-components/macro";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { FaEdit, FaTrashAlt, FaUndo, FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";

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
                <div className="col-lg-8 col-md-6" onClick={() => handleView(task)}>
                    <div className="circle"/>
                    <div className="block-task">
                        <TitleTask>{task.title}</TitleTask>
                        <Moment format="DD/MM/YYYY">{task.expirationDate}</Moment>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <IconContext.Provider value={{ className: "react-icons-items" }}>
                        <div>
                            <FaEdit onClick={() => handleEdit(task)}/>
                            <FaTrashAlt onClick={() => handleDelete(task.id)}/>
                            <FaCheck onClick={() => handleCompleted(task.id)}/>
                            <FaUndo onClick={() => handleActive(task.id)}/>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    );
}

const TaskItem = styled(TaskItem_)`
  background: white;  
  color: #1276DC;
  text-decoration: ${props => props.task.isCompleted ? "line-through" : "none"};
  margin: 1.5em 1em;
  border: 1px dashed #1276DC;
  padding: 1.2em 0.6em;
  border-radius: 0.5em;
  cursor: move;
  
  .circle {
    background: ${props => props.task.color};
    border: 0.1875em solid #1276DC;
    border-radius: 50%;
    height: 1em;
    width: 1em;
    margin-top: -0.4em
  } 
  
  .block-task {
    margin-left: 1.5em;
  }
`;

export default TaskItem;