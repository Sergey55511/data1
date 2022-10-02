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
                display: flex;
                column-gap: 16px;
                border-bottom: 1px solid rgb(250, 250, 250);
                h4 {
                    flex: 0 0 110px;
                    margin-bottom: 4px;
                }
                div {
                    height: 22px;
                }
            }
        }
        .result {
            flex: 3;
        }
    }
`;
