import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    .modelsList {
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        row-gap: 2px;
        height: 200px;
        overflow: auto;
        &:hover {
            border-color: #40a9ff;
        }
        .row {
            padding: 4px 12px;
            cursor: pointer;
            &.selected {
                background-color: #f5f5f5;
            }
            &:hover {
                background-color: #f5f5f5;
            }
        }
    }
`;
