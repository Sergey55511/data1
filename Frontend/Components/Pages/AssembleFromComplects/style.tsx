import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    .buttonWrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        .leftButtons {
            display: flex;
            align-items: center;
            column-gap: 16px;
        }
    }
    .tableWrapperLeftovers {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
`;
