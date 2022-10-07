import styled from 'styled-components';

export const Wrapper = styled.div`
    .flex {
        display: flex;
        flex-wrap: wrap;
        column-gap: 8px;
        row-gap: 4px;
        .item {
            flex: 49%;
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
    .ant-divider {
        margin: 8px 0px;
    }
`;
