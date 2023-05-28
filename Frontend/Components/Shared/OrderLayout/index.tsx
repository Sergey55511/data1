import { Frame } from '../Frame';
import { Title } from '../Title';
import { Wrapper } from './style';

export const OrderLayout = ({
    title,
    leftChildren,
    rightChildren,
    leftTitle = 'В работе',
    rightTitle = 'Результат',
}: {
    title: string;
    leftChildren: JSX.Element;
    rightChildren: JSX.Element;
    leftTitle?: string;
    rightTitle?: string;
}) => {
    return (
        <Wrapper>
            <Title text={title} />
            <div className="content">
                <Frame legend={leftTitle}>{leftChildren}</Frame>
                <div className="result">
                    <Frame legend={rightTitle}>{rightChildren}</Frame>
                </div>
            </div>
        </Wrapper>
    );
};
