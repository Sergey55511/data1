export const Item = ({ title, value }: { title?: string; value?: string | number }) => {
    return (
        <div className="item">
            <h4>{title}:</h4>
            <div>{value}</div>
        </div>
    );
};
