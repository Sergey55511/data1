export const Item = ({ title, children }: { title: string; children: JSX.Element }) => {
    return (
        <div className="item">
            <h4>{title}</h4>
            {children}
        </div>
    );
};
