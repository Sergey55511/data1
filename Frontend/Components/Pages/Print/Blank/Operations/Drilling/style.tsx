import styled from 'styled-components';

export const Wrapper = styled.div`
    font-size: 12px;
    .container {
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
    }
`;
