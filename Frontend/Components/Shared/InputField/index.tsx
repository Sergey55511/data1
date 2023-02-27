export const InputField = ({
    isError,
    errorMsg = 'Обязательное поле',
    children,
    width = 'auto',
}: {
    isError?: boolean;
    errorMsg?: string;
    width?: string;
    children: JSX.Element;
}) => {
    return (
        <div style={{ width }}>
            {children}
            {isError && <small style={{ color: 'red' }}>{errorMsg}</small>}
        </div>
    );
};
