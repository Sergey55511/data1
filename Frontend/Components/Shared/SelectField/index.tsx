import { Select, SelectProps } from 'antd';

export const SelectField = ({
    placeholder,
    value,
    onChange,
    options,
    selectProps,
}: {
    placeholder: string;
    onChange: (v: number) => void;
    options?: { value: number; caption: string }[];
    value?: number;
    selectProps?: SelectProps;
}) => {
    return (
        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...selectProps}
        >
            {options?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                    {item.caption}
                </Select.Option>
            ))}
        </Select>
    );
};
