export const Item = ({ title, children }: { title: string; children: JSX.Element }) => {
    return (
        <div className="itemGet">
            <h4>{title}</h4>
            <div className="inputWrapper">{children}</div>
        </div>
    );
};
