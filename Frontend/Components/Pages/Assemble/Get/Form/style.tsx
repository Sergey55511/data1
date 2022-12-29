import styled from 'styled-components';

export const Wrapper = styled.div`
    .model {
        margin-bottom: 24px;
        span {
            font-weight: 700;
            color: #1f2845;
        }
    }
    .form {
        display: flex;
        column-gap: 24px;
        margin-bottom: 16px;
        .column {
            display: flex;
            flex-direction: column;
            row-gap: 8px;
            .row {
                height: 32px;
                display: flex;
                column-gap: 8px;
                .label {
                    width: 110px;
                    color: #1f2845;
                    font-weight: 700;
                }
                .field {
                    width: 200px;
                }
            }
        }
    }
`;
