import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-top: 16px;
    padding-bottom: 16px;
    .rootContainer {
        width: 820px;
        margin: auto;
        a {
            display: inline-block;
            margin-bottom: 16px;
        }
    }
    @media print {
        .rootContainer {
            a {
                display: none !important;
            }
        }
    }
`;
