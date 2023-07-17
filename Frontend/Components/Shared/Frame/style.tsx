import styled from 'styled-components';

export const FrameWrapper = styled.fieldset`
    flex: 0 0 300px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px;
    padding-top: 0;
    margin-bottom: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    legend {
        font-size: 14px;
        margin-left: 16px;
        width: auto;
        padding-left: 5px;
        padding-right: 5px;
        margin-bottom: 0;
    }
    .frameBody {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 8px;
        .item {
            margin-bottom: 4px;
            display: flex;
            column-gap: 16px;
            border-bottom: 1px solid rgb(250, 250, 250);
            h4 {
                flex: 0 0 120px;
                margin-bottom: 4px;
            }
            div {
                min-height: 22px;
            }
        }
    }
`;
