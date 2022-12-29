import { SelectField } from '../../../../Shared/SelectField';

export const Row = ({
    label,
    children,
}: {
    label: string;
    children: JSX.Element;
}) => {
    return (
        <div className="row">
            <div className="label">{label}</div>
            <div className="field">{children}</div>
        </div>
    );
};
