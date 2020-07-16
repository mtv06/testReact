import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

interface TaskTabProps {
    className?: string;
    items: { key: string; title: string }[];
}

const Tab = styled(NavLink)`
  &.checked {
    background: radial-gradient(ellipse at top, #fff, transparent),
                radial-gradient(ellipse at bottom, #1276DC, transparent);
    color: #fff;
  }  
  text-decoration: none;
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
  display: grid;
  grid-template-areas: "tab1 tab2 tab3";
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  font-weight: 500;
  line-height: 1.4;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0.6em 1.6em 0 rgba(40, 43, 47, 0.1);
  user-select: none;
  margin: 0.8em 1.6em;
  a {
    color: #1276DC;
    padding-top: 0.5em;
  }
`;

export default TaskTabs;
