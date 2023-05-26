import { FrameWrapper } from './style';

export const Frame = ({
    children,
    legend,
}: {
    children: JSX.Element;
    legend: string;
}) => {
    return (
        <FrameWrapper>
            <legend>{legend}</legend>
            <div className="frameBody">{children}</div>
        </FrameWrapper>
    );
};
