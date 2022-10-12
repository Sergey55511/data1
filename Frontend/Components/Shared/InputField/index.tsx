export const InputField = ({
    isError,
    errorMsg = 'Обязательное поле',
    children,
}: {
    isError?: boolean;
    errorMsg?: string;
    children: JSX.Element;
}) => {
    return (
        <div>
            {children}
            {isError && <small style={{ color: 'red' }}>{errorMsg}</small>}
        </div>
    );
};
