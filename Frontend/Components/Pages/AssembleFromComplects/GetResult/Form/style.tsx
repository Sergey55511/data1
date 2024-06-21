import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    margin-bottom: 16px;

    .row {
        display: flex;
        align-items: baseline;
        gap: 16px;
        > div:first-child {
            flex: 100px;
        }
        .value {
            width: 100%;
        }
    }
`;
