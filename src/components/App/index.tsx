import React, { FC, useEffect, useState } from 'react';
import TaskList from "../TaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { Task } from "../../store/task/types";
import TaskForm from "../TaskForm";
import TaskEdit from "../TaskEdit";
import moment from "moment";
import TaskTabs from "../TaskTabs";
import { useRouteMatch } from 'react-router-dom';
import TaskView from "../TaskView";
import { GlobalStyles, theme, Content, Title } from "../../styled";
import { ThemeProvider } from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getTasks } from "../../api/controllers/task";
import { addTask } from "../../store/task/actions";

const App: FC = () => {
    const match = useRouteMatch();
    const tasks = useSelector<AppState, Task[]>(state => state.task.tasks);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initFormState: Task = {
        id: 1,
        title: "title1",
        description: "description1",
        expirationDate: new Date(),
        color: "#17a2b8",
        isCompleted: false
    }
    const [currentTask, setCurrentTask] = useState<Task>(initFormState);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editTask = (task: Task): void => {
        setCurrentTask(task);
    }

    const viewTask = (task: Task): void => {
        setCurrentTask(task);
    }

    const isEditingTask = (isEdit: boolean): void => {
        setIsEditing(isEdit);
    }

    const calculateDaysLeft = (date: Date): number => {
        const nowDate = moment(new Date());
        const expirationDate = moment(date);

        return expirationDate.diff(nowDate, "days");
    }

    const checkTask = (task: Task): void => {
        calculateDaysLeft(task.expirationDate) < 0 ?
            task.color = "#dc3545" :
            calculateDaysLeft(task.expirationDate) < 4 ?
                task.color = "#ff00ff" :
                task.color = "#17a2b8"
    }

    useEffect(() => {
        setInterval(() => {
            tasks.map(
                task => checkTask(task)
            )
        });
    });

    useEffect(() => {
        getTasks()
            .then(res => {
                if (res.status === 200) {
                    res.data.map(task =>
                        dispatch(addTask(task))
                    )
                    setIsLoading(true);
                } else {
                    console.error(`Error ${res.status}: ${res.statusText}` );
                }
             })
            .catch(error => {
                    console.error(error);
                }
            );
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Content>
                <Title>Tasks manager</Title>
                <div className="mainForm">
                    {isEditing ?
                        <TaskEdit currentTask={currentTask} isEditingTask={isEditingTask} checkTask={checkTask}/> :
                        <TaskForm tasks={tasks} checkTask={checkTask}/>
                    }
                </div>
                <div className="mainTasks">
                    <TaskView currentTask={currentTask} show={show} handleClose={handleClose}/>
                    <TaskTabs
                        className="tabs"
                        items={[
                            { key: 'all', title: 'All' },
                            { key: 'active', title: 'Active' },
                            { key: 'completed', title: 'Completed' },
                        ]}
                    />
                    <DndProvider backend={HTML5Backend}>
                        {isLoading && <TaskList
                            tasks={tasks}
                            editTask={editTask}
                            viewTask={viewTask}
                            isEditingTask={isEditingTask}
                            handleShow={handleShow}
                            path={match.path}
                        />
                        }
                    </DndProvider>
                </div>
            </Content>
        </ThemeProvider>
    );
}

export default App;
