import { Wrapper } from './style';

export const NameForm = ({ number, name }: { number: number; name: string }) => {
    return (
        <Wrapper>
            <div>{number}</div>
            <div className="name">{name}</div>
        </Wrapper>
    );
};
