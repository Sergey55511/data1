import { Input, InputProps } from 'antd';
import { tValue } from '../../../../../Shared/InputNumber';
import { iItem, iPrimeData } from '../constants';
interface iPrimeField extends InputProps {
    primeData: iPrimeData;
    fieldName: keyof iPrimeData;
    setPrameValue: <T extends keyof iPrimeData>(key: T, value: tValue) => void;
}

export const PrimeField = ({
    primeData,
    fieldName,
    setPrameValue,
    ...rest
}: iPrimeField) => {
    const item = primeData[fieldName];
    const onChangeHandler = (v: tValue) => setPrameValue(fieldName, v);
    return <InputField {...{ item, onChangeHandler, ...rest }} />;
};

const InputField = ({
    item,
    onChangeHandler,
    ...rest
}: {
    item: iItem;
    onChangeHandler: (v: tValue) => void;
}) => {
    return (
        <div className="item">
            {/* <InputNumber
                placeholder={item.placeholder}
                onChangeHandler={(v) => onChangeHandler(v)}
                value={item.value}
                allowClear
            /> */}
            <Input
                placeholder={item.placeholder}
                onChange={(v) => onChangeHandler(v.target.value)}
                value={item.value}
                allowClear
                {...rest}
            />
            {item.isError && <small style={{ color: 'red' }}>{item.errorMessage}</small>}
        </div>
    );
};
