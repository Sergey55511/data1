import { Radio, Space } from 'antd';
import { InputNumber } from '../../../../Shared/InputNumber';
import { SelectField } from '../../../../Shared/SelectField';
import { Row } from './row';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const Form = () => {
    const { model, state, setStateHandler, getValue, getSelectProps } = useProps();

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
                                    <Radio value={1}>I</Radio>
                                    <Radio value={2}>F</Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Row>
                    <Row label={'Тип заготовки'}>
                        <SelectField
                            {...getSelectProps('typeBillet')}
                            options={[
                                {
                                    caption: 'Четки',
                                    value: 1,
                                },
                                {
                                    caption: 'Бусы',
                                    value: 2,
                                },
                            ]}
                        />
                    </Row>
                    <Row label={'Тип сборки'}>
                        <SelectField
                            {...getSelectProps('typeAssemble')}
                            options={[
                                {
                                    caption: '30+1',
                                    value: 1,
                                },
                                {
                                    caption: '30+1+2',
                                    value: 2,
                                },
                            ]}
                        />
                    </Row>
                    <Row label={'Цвет'}>
                        <SelectField
                            {...getSelectProps('color')}
                            options={[
                                {
                                    caption: 'A1T1',
                                    value: 1,
                                },
                                {
                                    caption: 'A1T2',
                                    value: 2,
                                },
                            ]}
                        />
                    </Row>
                    <Row label={'Нить'}>
                        <SelectField
                            {...getSelectProps('yarn')}
                            options={[
                                {
                                    caption: 'GRN',
                                    value: 1,
                                },
                                {
                                    caption: 'N',
                                    value: 2,
                                },
                            ]}
                        />
                    </Row>
                    <Row label={'Сорт'}>
                        <SelectField
                            {...getSelectProps('grade')}
                            options={[
                                {
                                    caption: 'CA',
                                    value: 1,
                                },
                                {
                                    caption: 'CB',
                                    value: 2,
                                },
                            ]}
                        />
                    </Row>
                </div>
                <div className="column">
                    <Row label={'Длина'}>
                        <InputNumber
                            placeholder={state.length.placeholder}
                            onChangeHandler={(v) => {
                                setStateHandler('length', v);
                            }}
                        />
                    </Row>
                    <Row label={'Принято гр'}>
                        <InputNumber
                            placeholder={state.widthIn.placeholder}
                            onChangeHandler={(v) => {
                                setStateHandler('widthIn', v);
                            }}
                        />
                    </Row>
                    <Row label={'Принято шт'}>
                        <InputNumber
                            placeholder={state.countItemIn.placeholder}
                            onChangeHandler={(v) => {
                                setStateHandler('countItemIn', v);
                            }}
                        />
                    </Row>
                </div>
            </div>
        </Wrapper>
    );
};
