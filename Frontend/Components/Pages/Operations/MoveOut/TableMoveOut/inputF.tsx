import { InputField } from '../../../../Shared/InputField';
import { InputNumber } from '../../../../Shared/InputNumber';

export const InputF = ({
    value,
    onChangeHandler,
    isError,
}: {
    value: any;
    onChangeHandler: (v: any) => void;
    isError?: boolean;
}) => {
    return (
        <InputField isError={isError} errorMsg="Минусовой остаток">
            <InputNumber value={value} onChangeHandler={onChangeHandler} />
        </InputField>
    );
};
