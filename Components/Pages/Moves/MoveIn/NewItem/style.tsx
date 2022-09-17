import styled from 'styled-components';

export const Wrapper = styled.div`
    .item {
        flex: 0 0 200px;
    }
    .frame {
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px;
        padding-top: 0;
        margin-bottom: 8px;
        legend {
            font-size: 14px;
            margin-left: 16px;
            width: auto;
            padding-left: 5px;
            padding-right: 5px;
            margin-bottom: 0;
        }
        .primeData {
            display: flex;
            column-gap: 8px;
        }
    }
    .addRow {
        margin-bottom: 8px;
    }
    .addItemWrapper {
        display: flex;
        column-gap: 8px;
        align-items: baseline;
        border-radius: 4px;
        background-color: rgb(250, 250, 250);
        padding: 5px;
        margin-bottom: 8px;
    }
`;
