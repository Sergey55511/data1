import { Radio, Space } from 'antd';
import { InputNumber } from '../../../../Shared/InputNumber';
import { SelectField } from '../../../../Shared/SelectField';
import { iProps } from '../useProps';
import { Row } from './row';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const Form = ({
    selectedRows,
    state,
    setState,
    model,
    setModel,
    typeAssemble,
}: iProps) => {
    const { setStateHandler, getSelectProps, data } = useProps(
        selectedRows,
        state,
        setState,
        setModel,
        typeAssemble,
    );

    return (
        <Wrapper>
            <div className="model">
                <span>Модель:</span> {model}
            </div>
            <div className="form">
                <div className="column">
                    <Row label={'Вариант сборки'}>
                        <div>
                            <Radio.Group
                                onChange={(v) =>
                                    setStateHandler('variantAssemble', v.target.value)
                                }
                                value={state.variantAssemble.value}
                            >
                                <Space direction="horizontal">
                                    {data.variants.data?.map((item) => (
                                        <Radio key={item.id} value={item.id}>
                                            {item.variantAssemble}
                                        </Radio>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </div>
                    </Row>
                    <Row label={'Сборщик'}>
                        <SelectField
                            {...getSelectProps('manager')}
                            selectProps={{
                                loading: data.managers.isLoading,
                            }}
                            options={data.managers.data?.map((item) => ({
                                caption: item.name,
                                value: item.id,
                            }))}
                        />
                    </Row>
                    <Row label={'Тип заготовки'}>
                        <SelectField
                            {...getSelectProps('typeBillet')}
                            selectProps={{
                                loading: data.results.isLoading,
                            }}
                            options={data.results.data?.map((item) => ({
                                caption: item.resultAssemble,
                                value: item.id,
                            }))}
                        />
                    </Row>
                </div>
                <div className="column">
                    <Row label={'Тип сборки'}>
                        <SelectField
                            {...getSelectProps('typeAssemble')}
                            selectProps={{
                                loading: data.results.isLoading,
                            }}
                            options={data.types.data?.map((item) => ({
                                caption: item.typeAssemble,
                                value: item.id,
                            }))}
                        />
                    </Row>
                    <Row label={'Цвет'}>
                        <SelectField
                            {...getSelectProps('color')}
                            selectProps={{
                                loading: data.results.isLoading,
                            }}
                            options={data.colors.data?.map((item) => ({
                                caption: item.colorAssemble,
                                value: item.id,
                            }))}
                        />
                    </Row>
                </div>
                <div className="column">
                    <Row label={'Нить'}>
                        <SelectField
                            {...getSelectProps('yarn')}
                            selectProps={{
                                loading: data.results.isLoading,
                            }}
                            options={data.yarns.data?.map((item) => ({
                                caption: item.yarnAssemble ?? '',
                                value: item.id ?? 0,
                            }))}
                        />
                    </Row>
                    <Row label={'Сорт'}>
                        <SelectField
                            {...getSelectProps('grade')}
                            selectProps={{
                                loading: data.results.isLoading,
                            }}
                            options={data.grades.data?.map((item) => ({
                                caption: item.gradeAssemble,
                                value: item.id,
                            }))}
                        />
                    </Row>
                    <Row label={'Длина'}>
                        <InputNumber
                            placeholder={state.length.placeholder}
                            onChangeHandler={(v) => {
                                setStateHandler('length', v);
                            }}
                            value={state.length.value}
                        />
                    </Row>
                </div>
                <div className="column">
                    <Row label={'Принято гр'}>
                        <InputNumber
                            placeholder={state.widthIn.placeholder}
                            onChangeHandler={(v) => {
                                setStateHandler('widthIn', v);
                            }}
                            value={state.widthIn.value}
                        />
                    </Row>
                </div>
            </div>
        </Wrapper>
    );
};
