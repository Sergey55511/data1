import styled from 'styled-components';

export const Wrapper = styled.div`
    flex: 1;
    .header {
        h3 {
            white-space: nowrap;
        }
        display: flex;
        column-gap: 16px;
    }
    .bodyBijouterie {
        width: 250px;
        /* overflow: hidden;
        > div {
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(128, 128, 128, 0.5);
            margin-bottom: 8px;
        } */
    }
    .itemsWrapper {
        .rowWrapper {
            display: flex;
            column-gap: 16px;
        }
    }
`;
