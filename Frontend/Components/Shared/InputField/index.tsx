export const InputField = ({
    isError,
    children,
}: {
    isError?: boolean;
    children: JSX.Element;
}) => {
    return (
        <div>
            {children}
            {isError && <small style={{ color: 'red' }}>Обязательное поле</small>}
        </div>
    );
};
