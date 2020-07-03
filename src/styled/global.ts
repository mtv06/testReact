import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${({ theme }) => css`
    html {
      height: 100%;

      body {
        display: grid;
        grid-template-areas: ". content .";
        grid-template-columns: 10% 1fr 10%;
        grid-row-gap: 10px;
        grid-column-gap: 10px;
        height: 100vh;
        margin: 0;
        height: 100%;
        justify-content: center;
        padding: 15px;
        background: ${theme.colors.background};
        color: ${theme.colors.blue}; 
        font-family: sans-serif;

        #root {
          grid-area: content;
        }
      }
    }
  `}
`