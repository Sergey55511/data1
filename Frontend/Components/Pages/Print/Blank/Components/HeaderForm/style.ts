import styled from 'styled-components';

export const Wrapper = styled.div`
    .firstTitleTable {
        display: flex;
        > div {
            flex: 1;
            font-size: 500;
            border: 1px solid #000;
            border-top: 2px solid #000;
        }
    }
    .secondTitleTable {
        display: flex;
        > div {
            flex: 1;
            display: flex;
            .item {
                flex: 1;
                width: 0;
                border-bottom: 1px solid #000;
                border-right: 1px solid #000;
                &:first-child {
                    border-left: 1px solid #000;
                }
            }
        }
    }
`;
