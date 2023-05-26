import { Title } from '../Title';
import { Wrapper } from './style';

export const OrderLayout = ({
    title,
    leftChildren,
    rightChildren,
}: {
    title: string;
    leftChildren: JSX.Element;
    rightChildren: JSX.Element;
}) => {
    return (
        <Wrapper>
            <Title text={title} />
            <div className="content">
                {leftChildren}
                <div className="result">{rightChildren}</div>
            </div>
        </Wrapper>
    );
};
