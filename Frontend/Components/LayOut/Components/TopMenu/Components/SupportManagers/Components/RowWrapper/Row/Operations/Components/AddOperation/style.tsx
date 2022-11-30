import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    margin-bottom: 16px;
    .select {
        flex: 1;
        .ant-select-selector {
            border-radius: 2px 0 0 2px;
        }
    }
    button {
        border-radius: 0px 2px 2px 0px;
    }
`;
