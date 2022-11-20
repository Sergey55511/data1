import styled from 'styled-components';

export const Wrapper = styled.div`
    .title {
        display: flex;
        justify-content: space-between;
        .red {
            color: red;
        }
    }
    .item {
        margin-bottom: 4px;
        width: 250px;
        h4 {
            margin-bottom: 4px;
        }
        .input {
            width: 250px;
        }
        .error {
            color: red;
        }
    }
`;
