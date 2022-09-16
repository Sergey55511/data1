import styled from 'styled-components';

export const Wrapper = styled.div`
    .ant-table-cell {
        padding: 5px;
        .ant-table-filter-trigger {
            padding-right: 10px;
        }
    }
    .params {
        display: flex;
        column-gap: 24px;
        align-items: baseline;
        justify-content: space-between;
        .settings {
            display: flex;
            column-gap: 24px;
            align-items: baseline;
        }
    }
    .additionalsParams {
        display: flex;
        column-gap: 8px;
        align-items: baseline;
        margin-top: 8px;
        margin-bottom: 8px;
        justify-content: space-between;
    }
`;
