import styled from 'styled-components';

export const Wrapper = styled.div`
    .title {
        padding: 4px;
        margin-bottom: 8px;
        display: flex;
        column-gap: 15px;
        align-items: center;
        .red {
            color: red;
        }
    }
    .row {
        margin-bottom: 8px;
        display: flex;
        column-gap: 4px;
        padding: 4px;
        border-radius: 4px;
        background-color: RGB(250, 250, 250);
        &.duplicate{
            background-color: rgb(238, 109, 109)
        }
        .item {
            width: 185px;
        }
    }
`;
