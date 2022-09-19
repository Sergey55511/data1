import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .body {
        flex: 1;
        background: #edf1f7;
        padding: 8px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        .papper {
            background-color: #fff;
            flex: 1;
            border-radius: 4px;
            padding: 24px;
        }
    }
`;
