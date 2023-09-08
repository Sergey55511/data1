import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin:0px;
        box-sizing: border-box;
        #__next{
          height: 100%;
        }
        .ant-spin-nested-loading {
            height: 100%;
            overflow-y: auto;
            overflow-x: clip;
            .ant-spin-container {
                height: 100%;
            }
        }
    }`;
