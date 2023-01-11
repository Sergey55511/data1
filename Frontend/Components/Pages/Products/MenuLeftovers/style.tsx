import styled from 'styled-components';

export const Wrapper = styled.div`
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

        .titleWrapper {
            display: flex;
            column-gap: 16px;
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
