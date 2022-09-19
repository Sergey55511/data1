import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .list {
        flex: 1;
        overflow-y: auto;
        overflow-x: clip;
        .item {
            padding-top: 4px;
            padding-bottom: 4px;
            cursor: pointer;
            border-radius: 4px;
            margin-bottom: 4px;
            &:hover {
                background-color: rgb(250, 250, 250);
            }
            .number {
                font-weight: 600;
            }
        }
    }
    .newPP {
        .descriprion {
            margin-bottom: 8px;
        }
    }
`;
