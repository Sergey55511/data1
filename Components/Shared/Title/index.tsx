import styled from 'styled-components';

const H3 = styled.h3`
    color: '#1F2845';
    margin-bottom: 16px;
`;
export const Title = ({ text }: { text: string }) => (
    <H3 style={{ color: '#1F2845' }}>{text}</H3>
);
