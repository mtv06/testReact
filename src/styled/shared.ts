import styled from "styled-components";

export const Title = styled.h1`
  font-size: 3.5em;
  text-align: center;
  color: palevioletred;
  grid-area: header;
`;

export const TitleForm = styled.h1`
  font-size: 2.5em;
  text-align: left;
  color: palevioletred;
  grid-area: form;
`;

export const TitleTask = styled.h1`
  font-size: 1.5em;
  text-align: left;
`;

export const Form = styled.div`
  input {
    width: 80%;
    height: 40px;
    color: grey;
  }
      
  .react-datepicker-wrapper {
    width: 80%;
  }
  
  .react-datepicker__input-container input {
    color: grey;
    width: 100%;
  }
`;

export const Button = styled.button`
  background: white;
  color: #28a745;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid #28a745;
  border-radius: 3px;
  width: 80%;
  height: 40px;
`;