import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

interface TaskTabProps {
    className?: string;
    items: { key: string; title: string }[];
}

const Tab = styled(NavLink)`
  &.checked {
    background: radial-gradient(palevioletred, #000);
    color: #fff;
  }  
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 32px;
  width: 100%;
  height: 100%;
  input {
    display: none;
  }
`;

const TaskTabs_: FC<TaskTabProps> = (
    {
        className,
        items
    }) => (
    <div className={className}>
        {items.map(({ key, title }) => (
            <Tab key={key} to={key} activeClassName="checked">
                {title}
            </Tab>
        ))}
    </div>
);

const TaskTabs = styled(TaskTabs_)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  font-family: 'Geometria-Medium', sans-serif;
  font-weight: 500;
  line-height: 1.4;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 6px 16px 0 rgba(40, 43, 47, 0.1);
  user-select: none;
  margin: 8px 16px;
  a {
    color: palevioletred;
  }
`;

export default TaskTabs;
