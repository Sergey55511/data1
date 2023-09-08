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

            &.borderNone {
                border-bottom: none;
                border-top: none;
                border-left: none;
                border-right: none;
            }

            &.borderBottom {
                border-bottom: 1px solid #000;
            }
            &.borderTop {
                border-top: 1px solid #000;
            }
            &.borderLeft {
                border-left: 1px solid #000;
            }
            &.borderRight {
                border-right: 1px solid #000;
            }
            &:first-child {
                border-left: 1px solid #000;
            }
        }
    }
`;
