import styled from 'styled-components';

export const Wrapper = styled.div`
    .formWrapper {
        display: flex;
        flex-direction: column;
        row-gap: 4px;
    }
    .flex {
        display: flex;
        flex-wrap: wrap;
        column-gap: 8px;
        .item {
            flex: 1;
            > * {
                margin-bottom: 0;
            }
            > p {
                min-height: 22px;
            }
        }
        .itemNumProduction {
            flex: 1;
        }
    }

    .item {
        .inputWrapper {
            display: flex;
            column-gap: 8px;
        }
    }

    .selectButtons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .ant-divider {
        margin: 8px 0px;
    }
`;
