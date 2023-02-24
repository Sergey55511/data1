import { Button, Input, Tooltip } from 'antd';
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
                {props.stateDuplicate.map((item, index) => (
                    <Row
                        key={index}
                        copyRow={() => props.copyRow(index)}
                        removeRow={() => props.removeRow(index)}
                        isDuplicate={item.duplicate}
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
                            <InputField key="lengthId" isError={item.lengthId.isError}>
                                <SelectField
                                    placeholder={item.lengthId.placeholder}
                                    value={+item.lengthId.value || undefined}
                                    onChange={(v) => props.onChange(index, v, 'lengthId')}
                                    options={props.data.length?.data?.map((item) => ({
                                        value: item.id,
                                        caption: item.length,
                                    }))}
                                    selectProps={{
                                        disabled: props.data.length.isLoading,
                                        loading: props.data.length.isFetching,
                                    }}
                                />
                            </InputField>,
                            <InputField key="channelId" isError={item.channelId.isError}>
                                <SelectField
                                    placeholder={item.channelId.placeholder}
                                    value={+item.channelId.value || undefined}
                                    onChange={(v) =>
                                        props.onChange(index, v, 'channelId')
                                    }
                                    options={props.data.channel?.data?.map((item) => ({
                                        value: item.id,
                                        caption: item.channel,
                                    }))}
                                    selectProps={{
                                        disabled: props.data.channel.isLoading,
                                        loading: props.data.channel.isFetching,
                                    }}
                                />
                            </InputField>,
                            <InputField key="typeId" isError={item.typeId.isError}>
                                <SelectField
                                    placeholder={item.typeId.placeholder}
                                    value={+item.typeId.value || undefined}
                                    onChange={(v) => props.onChange(index, v, 'typeId')}
                                    options={props.data.type?.data?.map((item) => ({
                                        value: item.id,
                                        caption: item.type,
                                    }))}
                                    selectProps={{
                                        disabled: props.data.type.isLoading,
                                        loading: props.data.type.isFetching,
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
                            <InputField
                                key="widthInDocument"
                                isError={item.widthInDocument.isError}
                            >
                                <InputNumber
                                    placeholder={item.widthInDocument.placeholder}
                                    onChangeHandler={(v) => {
                                        props.onChange(index, v!, 'widthInDocument');
                                    }}
                                    value={item.widthInDocument.value || ''}
                                />
                            </InputField>,
                            <InputField
                                key="countItemsIn"
                                isError={item.countItemsIn.isError}
                            >
                                <InputNumber
                                    placeholder={item.countItemsIn.placeholder}
                                    onChangeHandler={(v) => {
                                        props.onChange(index, v!, 'countItemsIn');
                                    }}
                                    value={item.countItemsIn.value || ''}
                                />
                            </InputField>,
                            <InputField key="moneyIn" isError={item.moneyIn.isError}>
                                <InputNumber
                                    placeholder={item.moneyIn.placeholder}
                                    onChangeHandler={(v) => {
                                        props.onChange(index, v!, 'moneyIn');
                                    }}
                                    value={item.moneyIn.value || ''}
                                />
                            </InputField>,
                        ]}
                    />
                ))}
            </div>
        </Wrapper>
    );
};
