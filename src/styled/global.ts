import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${({ theme }) => css`
    html {
      height: 100%;

      body {
        display: grid;
        grid-template-areas: ". content .";
        grid-template-columns: 0.5fr 1fr 0.5fr;
        grid-gap: 1rem;
        margin: 0;
        height: 100%;
        justify-content: center;
        padding: 15px;
        background: ${theme.colors.background};
        color: ${theme.colors.blue}; 
        font-family: sans-serif;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;

        #root {
          grid-area: content;
          height: 100%;
        }
      }
    }
  `}
`