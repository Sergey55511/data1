import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    font-size: 12px;
    .container {
        flex: 0 0 620px;

        .firstRow {
            display: flex;
            column-gap: 8px;
            .firstRowItem {
                flex: 1;
                display: flex;
                column-gap: 8px;

                .label {
                    white-space: nowrap;
                }
                .value {
                    /* background-color: #c75600; */
                    font-weight: 500;
                }
            }
        }
        .secondRow {
            display: flex;
            column-gap: 8px;
            .color {
                margin-left: auto;
                display: flex;
                column-gap: 8px;
            }
        }
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
    }
`;
