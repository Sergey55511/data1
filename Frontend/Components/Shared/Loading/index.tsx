import { Spin } from 'antd';

export const Loading = ({
    children,
    isLoading,
    addClass,
}: {
    children: JSX.Element;
    isLoading: boolean;
    addClass?: string;
}) => {
    return (
        <Spin
            tip="Загрузка..."
            spinning={isLoading}
            wrapperClassName={'loader' + addClass ?? ''}
        >
            {children}
        </Spin>
    );
};
