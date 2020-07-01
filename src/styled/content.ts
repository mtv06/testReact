import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-areas:
    "header header"
    "form tasks";
    grid-template-rows: 80px 1fr;
    grid-template-columns: 30% 1fr;
    
    .mainForm {
        grid-area: form;
    }
    
    .mainTasks {
        grid-area: tasks;
    }
`;