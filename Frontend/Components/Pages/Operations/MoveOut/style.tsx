import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
        display: flex;
        column-gap: 16px;
        align-items: baseline;
        .recipientWrapper {
            width: 200px;
        }
        .numShipment {
            width: 200px;
        }
    }
    .buttonGroup {
        display: flex;
        column-gap: 16px;
        margin-bottom: 8px;
    }
    .tableWrapper {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
`;
