import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    > div {
        flex: 1;
        display: flex;
        .cell {
            min-height: 20px;
            flex: 1;
            border-bottom: 1px solid #000;
            border-right: 1px solid #000;
            &.gray {
                background-color: lightgray;
            }
            &:first-child {
                border-left: 1px solid #000;
            }
        }
    }
`;
