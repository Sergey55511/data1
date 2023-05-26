import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        column-gap: 8px;
        fieldset {
            height: 100%;
        }
        .result {
            flex: 1;
        }
    }
`;
