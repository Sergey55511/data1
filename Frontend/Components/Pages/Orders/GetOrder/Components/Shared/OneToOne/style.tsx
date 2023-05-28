import styled from 'styled-components';

export const Wrapper = styled.div`
    .title {
        display: flex;
        justify-content: space-between;
        .red {
            color: red;
        }
    }
    .itemGet {
        display: flex;
        margin-bottom: 4px;
        width: 350px;
        border-bottom: none;
        h4 {
            flex: 1;
        }
        .inputWrapper {
            flex: 1;
            .input {
                width: 100%;
            }
        }
        .error {
            color: red;
        }
    }
`;
