import React, { FC, useEffect, useState } from 'react';
import TaskList from "../TaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { Task, AddTaskAction } from "../../store/task/types";
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
import { Dispatch } from "redux";
import Notifications, { useNotification } from "../Notifications";
import { FaPlusCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";

const App: FC = () => {
    const match = useRouteMatch();
    const tasks = useSelector<AppState, Task[]>(state => state.task.tasks);
    const dispatch = useDispatch<Dispatch<AddTaskAction>>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notification, setNotification] = useNotification();
    const [currentTask, setCurrentTask] = useState<Task>();

    const [showFormView, setShowFormView] = useState<boolean>(false);
    const handleCloseFormView = () => setShowFormView(false);
    const handleShowFormView = () => setShowFormView(true);

    const [showFormAdd, setShowFormAdd] = useState<boolean>(false);
    const handleCloseFormAdd = () => setShowFormAdd(false);
    const handleShowFormAdd = () => setShowFormAdd(true);

    const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
    const handleCloseFormEdit = () => setShowFormEdit(false);
    const handleShowFormEdit = () => setShowFormEdit(true);

    const editTask = (task: Task): void => {
        setCurrentTask(task);
    }

    const viewTask = (task: Task): void => {
        setCurrentTask(task);
    }

    const pushNotification = (status: string): void => {
        setNotification(status);
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
                task.color = "#ffea00" :
                task.color = "#00c853"
    }

    const handleAdd = (): void => {
        handleShowFormAdd();
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
                    pushNotification(`Error ${res.status}: ${res.statusText}`);
                }
             })
            .catch(error => {
                pushNotification(error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <span className="notification">
                <Notifications data={notification} />
            </span>
            <Content>
                <Title className="title-task">Tasks manager</Title>
                <div className="main-tasks">
                    {currentTask &&
                        <TaskView
                            currentTask={currentTask}
                            show={showFormView}
                            handleClose={handleCloseFormView}
                        />
                    }
                    {currentTask &&
                        <TaskEdit
                            currentTask={currentTask}
                            checkTask={checkTask}
                            pushNotification={pushNotification}
                            show={showFormEdit}
                            handleClose={handleCloseFormEdit}
                        />
                    }
                    <TaskForm
                        tasks={tasks}
                        checkTask={checkTask}
                        pushNotification={pushNotification}
                        show={showFormAdd}
                        handleClose={handleCloseFormAdd}
                    />
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
                            handleShowFormView={handleShowFormView}
                            handleShowFormEdit={handleShowFormEdit}
                            pushNotification={pushNotification}
                            path={match.path}
                        />
                        }
                    </DndProvider>
                    <IconContext.Provider value={{ className: "react-icons" }}>
                        <div className="react-icons__add-button" onClick={() => handleAdd()}>
                            <FaPlusCircle />
                        </div>
                    </IconContext.Provider>
                </div>
            </Content>
        </ThemeProvider>
    );
}

export default App;
