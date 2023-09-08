import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-bottom: 24px;
    .container {
        display: flex;
        column-gap: 8px;
    }
    @media print {
        * {
            display: none !important;
        }
    }
`;
