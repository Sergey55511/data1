import { Wrapper } from './style';

export const Row = ({ label, value }: { label: string; value?: string | number }) => {
    return (
        <Wrapper>
            <div className="label">{label}</div>
            <div>{value}</div>
        </Wrapper>
    );
};
