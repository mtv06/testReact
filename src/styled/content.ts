import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-areas:
    "header"
    "tasks";
    grid-template-rows: auto-fit 1fr;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    position: relative;
    z-index: 1;
    
    .title-task {
        grid-area: header;
    }
    
    .main-tasks {
        grid-area: tasks;
    }
`;