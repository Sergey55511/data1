import styled from 'styled-components';

export const Wrapper = styled.div`
    .flex {
        display: flex;
        flex-wrap: wrap;
        column-gap: 8px;
        row-gap: 8px;
        .item {
            flex: 49%;
        }
        .itemNumProduction {
            flex: 1;
        }
    }
`;
