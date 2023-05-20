import styled from 'styled-components';

export const Wrapper = styled.div`
    .header {
        h3 {
            white-space: nowrap;
        }
        display: flex;
        column-gap: 16px;
    }
    .bodyBijouterie {
        display: flex;
        > div {
            flex: 1;
        }
    }
`;
