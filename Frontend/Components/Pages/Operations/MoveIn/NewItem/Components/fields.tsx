import { Input, InputProps, Select } from 'antd';
import { iItem, iPrimeData } from '../constants';
interface iField extends InputProps {
    item: iItem;
    onChangeHandler: (v: string | number) => void;
}
export const Field = ({ item, onChangeHandler, ...rest }: iField) => (
    <InputField {...{ item, onChangeHandler, ...rest }} />
);
interface iPrimeField extends InputProps {
    primeData: iPrimeData;
    fieldName: keyof iPrimeData;
    setPrameValue: <T extends keyof iPrimeData>(
        key: T,
        value: iPrimeData[T]['value'],
    ) => void;
}

export const PrimeField = ({
    primeData,
    fieldName,
    setPrameValue,
    ...rest
}: iPrimeField) => {
    const item = primeData[fieldName];
    const onChangeHandler = (v: string | number) => setPrameValue(fieldName, v);
    return <InputField {...{ item, onChangeHandler, ...rest }} />;
};

const InputField = ({
    item,
    onChangeHandler,
    ...rest
}: {
    item: iItem;
    onChangeHandler: (v: string | number) => void;
}) => {
    return (
        <div className="item">
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
export const SelectField = ({
    item,
    onChangeHandler,
    options,
    ...rest
}: {
    item: iItem;
    onChangeHandler: (v: string | number) => void;
    options: { value: string | number; caption: string }[];
}) => {
    return (
        <div className="item">
            <Select
                style={{ width: '100%' }}
                showSearch
                allowClear
                placeholder={item.placeholder}
                optionFilterProp="children"
                onChange={(v) => onChangeHandler(v)}
                filterOption={(input, option) =>
                    (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                value={item.value || undefined}
            >
                {options.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.caption}
                    </Select.Option>
                ))}
            </Select>
            {item.isError && <small style={{ color: 'red' }}>{item.errorMessage}</small>}
        </div>
    );
};
