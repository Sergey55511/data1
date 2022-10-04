import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Input, List, Select, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStores } from '../../../../../../../Store/useStores';
import { InputNumber } from '../../../../../../Shared/InputNumber';
import { Wrapper } from './style';

interface iField {
    key: string;
    placeholder: string;
    value: string | number;
}
interface iState {
    typeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
}

class Field implements iField {
    key;
    placeholder;
    value = '';
    constructor(key: string, placeholder: string) {
        this.key = key;
        this.placeholder = placeholder;
    }
}

export const Sorting = observer(() => {
    const { ListsStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    typeId: new Field('typeId', 'Тип'),
                    gradeId: new Field('gradeId', 'Сорт'),
                    colorId: new Field('colorId', 'Цвет'),
                    sizeRangeId: new Field('sizeRangeId', 'Размерный ряд'),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
        });
    };

    const removeRow = (index: number) => {
        setState((prev) => prev.filter((_, i) => i != index));
    };
    return (
        <Wrapper>
            <div className="title">
                <Tooltip title="Сохранить">
                    <Button shape="circle" icon={<CheckOutlined />} />
                </Tooltip>
                <a href="#" onClick={addRowHandler}>
                    Добавить строку
                </a>
            </div>
            <div>
                {state.map((item, index) => {
                    const onChange = (
                        v: string | number,
                        index: number,
                        fieldName: keyof iState,
                    ) => {
                        setState((prev) => {
                            prev[index][fieldName].value = v;
                            return [...prev];
                        });
                    };
                    return (
                        <div key={index} className="row">
                            <Tooltip title="Удалить строку">
                                <Button
                                    shape="circle"
                                    icon={<MinusOutlined />}
                                    onClick={() => removeRow(index)}
                                />
                            </Tooltip>
                            <div className="item">
                                <InputField>
                                    <SelectField
                                        placeholder={item.typeId.placeholder}
                                        value={+item.typeId.value || undefined}
                                        onChange={(v) => onChange(v, index, 'typeId')}
                                        options={ListsStore.types.map((item) => ({
                                            value: item.id,
                                            caption: item.type,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField>
                                    <SelectField
                                        placeholder={item.gradeId.placeholder}
                                        value={+item.gradeId.value || undefined}
                                        onChange={(v) => onChange(v, index, 'gradeId')}
                                        options={ListsStore.grades.map((item) => ({
                                            value: item.id,
                                            caption: item.grade,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField>
                                    <SelectField
                                        placeholder={item.colorId.placeholder}
                                        value={+item.colorId.value || undefined}
                                        onChange={(v) => onChange(v, index, 'colorId')}
                                        options={ListsStore.colors.map((item) => ({
                                            value: item.id,
                                            caption: item.color,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField>
                                    <SelectField
                                        placeholder={item.sizeRangeId.placeholder}
                                        value={+item.sizeRangeId.value || undefined}
                                        onChange={(v) =>
                                            onChange(v, index, 'sizeRangeId')
                                        }
                                        options={ListsStore.sizeRange.map((item) => ({
                                            value: item.id,
                                            caption: item.sizeRange,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField>
                                    <InputNumber
                                        placeholder={item.widthIn.placeholder}
                                        onChangeHandler={(v) => {
                                            onChange(v!, index, 'widthIn');
                                        }}
                                        value={item.widthIn.value || ''}
                                    />
                                </InputField>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
});

const InputField = ({
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

const SelectField = ({
    placeholder,
    value,
    onChange,
    options,
}: {
    placeholder: string;
    onChange: (v: number) => void;
    options: { value: number; caption: string }[];
    value?: number;
}) => {
    return (
        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        >
            {options.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                    {item.caption}
                </Select.Option>
            ))}
        </Select>
    );
};
