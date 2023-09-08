import styled from 'styled-components';
import { Wrapper } from './style';

const H3 = styled.h3`
    color: '#1F2845';
    margin-bottom: 16px;
`;
export const Title = ({ text, content }: { text: string; content?: JSX.Element }) => (
    <Wrapper>
        <H3 style={{ color: '#1F2845' }}>{text}</H3>
        {content}
    </Wrapper>
);
