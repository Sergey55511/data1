import styled from 'styled-components';

export const Wrapper = styled.div`
    .content {
        display: flex;
        column-gap: 8px;
        fieldset {
            height: 100%;
        }
        .order {
            flex: 1;
            .item {
                margin-bottom: 4px;
                h4 {
                    margin-bottom: 4px;
                }
                div {
                    height: 22px;
                }
            }
        }
        .result {
            flex: 1;
        }
    }
`;
