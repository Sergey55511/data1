import { Button, Input, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Title } from '../../../../Shared/Title';
import { useProps } from './useProps';
import { Wrapper } from './style';
import { InputNumber } from '../../../../Shared/InputNumber';
import { Row } from '../../../../Shared/Row';
import { InputField } from '../../../../Shared/InputField';
import { SelectField } from '../../../../Shared/SelectField';

export const NewItemBillets = () => {
    const props = useProps();

    return (
        <Wrapper>
            <Title
                text="Приход заготовок"
                content={
                    <div className="inputWrapper">
                        <Tooltip
                            placement="top"
                            title={`Макс партия: ${props.maxLot.data || 0}`}
                        >
                            <InputNumber
                                value={props.lot}
                                placeholder="Партия"
                                onChangeHandler={(v) => props.setLot(v)}
                                width={300}
                                allowClear
                            />
                        </Tooltip>
                        <Input
                            value={props.numDocument}
                            placeholder="Накладная"
                            onChange={(e) => props.setNumDocument(e.target.value)}
                            width={300}
                            allowClear
                        />
                        <Button type="primary" onClick={props.subbmitHandler}>
                            Сохранить
                        </Button>
                    </div>
                }
            />
            <div className="addrow">
                <a href="#" onClick={props.addRowHandler}>
                    Добавить строку
                </a>
            </div>
            <div className="rows">
                {props.state.map((item, index) => (
                    <Row
                        key={index}
                        copyRow={() => props.copyRow(index)}
                        removeRow={() => props.removeRow(index)}
                        fields={[
                            <InputField
                                key="workpieceTypeId"
                                isError={item.workpieceTypeId.isError}
                            >
                                <SelectField
                                    placeholder={item.workpieceTypeId.placeholder}
                                    value={+item.workpieceTypeId.value || undefined}
                                    onChange={(v) =>
                                        props.onChange(index, v, 'workpieceTypeId')
                                    }
                                    options={props.data.workpieceType?.data?.map(
                                        (item) => ({
                                            value: item.id,
                                            caption: item.workpieceType,
                                        }),
                                    )}
                                    selectProps={{
                                        disabled: props.data.workpieceType.isLoading,
                                        loading: props.data.workpieceType.isFetching,
                                    }}
                                />
                            </InputField>,
                            <InputField key="gradeId" isError={item.gradeId.isError}>
                                <SelectField
                                    placeholder={item.gradeId.placeholder}
                                    value={+item.gradeId.value || undefined}
                                    onChange={(v) => props.onChange(index, v, 'gradeId')}
                                    options={props.data.grade?.data?.map((item) => ({
                                        value: item.id,
                                        caption: item.grade,
                                    }))}
                                    selectProps={{
                                        disabled: props.data.grade.isLoading,
                                        loading: props.data.grade.isFetching,
                                    }}
                                />
                            </InputField>,
                            <InputField key="colorId" isError={item.colorId.isError}>
                                <SelectField
                                    placeholder={item.colorId.placeholder}
                                    value={+item.colorId.value || undefined}
                                    onChange={(v) => props.onChange(index, v, 'colorId')}
                                    options={props.data.color?.data?.map((item) => ({
                                        value: item.id,
                                        caption: item.color,
                                    }))}
                                    selectProps={{
                                        disabled: props.data.color.isLoading,
                                        loading: props.data.color.isFetching,
                                    }}
                                />
                            </InputField>,
                            <InputField
                                key="sizeRangeId"
                                isError={item.sizeRangeId.isError}
                            >
                                <SelectField
                                    placeholder={item.sizeRangeId.placeholder}
                                    value={+item.sizeRangeId.value || undefined}
                                    onChange={(v) =>
                                        props.onChange(index, v, 'sizeRangeId')
                                    }
                                    options={props.data.sizeRange?.data?.map((item) => ({
                                        value: item.id,
                                        caption: item.sizeRange,
                                    }))}
                                    selectProps={{
                                        disabled: props.data.sizeRange.isLoading,
                                        loading: props.data.sizeRange.isFetching,
                                    }}
                                />
                            </InputField>,
                            <InputField key="widthIn" isError={item.widthIn.isError}>
                                <InputNumber
                                    placeholder={item.widthIn.placeholder}
                                    onChangeHandler={(v) => {
                                        props.onChange(index, v!, 'widthIn');
                                    }}
                                    value={item.widthIn.value || ''}
                                />
                            </InputField>,
                        ]}
                    />
                ))}
            </div>
        </Wrapper>
    );
};
