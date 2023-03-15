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
        .order {
            flex: 0 0 300px;
            .frameBody {
                height: 100%;
                overflow: auto;
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
        }
        .result {
            flex: 1;
            .resultWrapper {
                height: 100%;
                overflow: auto;
            }
        }
    }
`;
