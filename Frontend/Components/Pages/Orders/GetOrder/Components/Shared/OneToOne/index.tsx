import { Button, DatePicker } from 'antd';
import { InputField } from '../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../Shared/SelectField';
import { Item } from './item';
import { Wrapper } from './style';
import { iProps, useProps } from './useProps';

export const OneToOne = (props: iProps) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <div className="title">
                <div className={params.isShowLosses ? 'red' : ''}>
                    Потеря: {params.state.losses?.toFixed(2) ?? props.record.widthOut}
                </div>
                <Button
                    loading={params.isLoading}
                    type="primary"
                    disabled={!params.isValid}
                    onClick={params.confirmSubbmit}
                >
                    Сохранить
                </Button>
            </div>
            <Item title="Дата">
                <DatePicker
                    className="input"
                    value={params.state.date}
                    onChange={(v) =>
                        params.setState((prev) => ({ ...prev, date: v ?? undefined }))
                    }
                />
            </Item>
            {props.isShowWorkingHours && (
                <Item title="Время работы мин.">
                    <InputNumber
                        placeholder="Введите данные"
                        value={params.state.workingHours}
                        onChangeHandler={(v) => {
                            params.onChangeInput('workingHours', v);
                        }}
                    />
                </Item>
            )}
            {props.isShowChannel && (
                <Item title="Канал">
                    <InputField
                        isError={!params.state.channel}
                        errorMsg="Обязательное значене"
                    >
                        <SelectField
                            placeholder="Канал"
                            value={params.state.channel}
                            onChange={(v) =>
                                params.setState((prev) => ({
                                    ...prev,
                                    channel: v ?? undefined,
                                }))
                            }
                            options={params.channelOptions}
                        />
                    </InputField>
                </Item>
            )}
            <Item title="Результат гр.">
                <InputField
                    isError={(params.state.widthIn || 0) < 0}
                    errorMsg="Отрицательное значение"
                >
                    <InputNumber
                        placeholder="Введите данные"
                        value={params.state.widthIn}
                        onChangeHandler={(v) => {
                            params.onChangeInput('widthIn', v);
                        }}
                    />
                </InputField>
            </Item>
            <Item title="Возврат гр.">
                <InputField>
                    <InputNumber
                        placeholder="Не обязательное поле"
                        value={params.state.moveBack}
                        onChangeHandler={(v) => {
                            params.onChangeInput('moveBack', v);
                        }}
                    />
                </InputField>
            </Item>
            {props.defect && (
                <Item title="Брак гр.">
                    <InputField>
                        <InputNumber
                            placeholder="Не обязательное поле"
                            value={params.state.defect}
                            onChangeHandler={(v) => {
                                params.onChangeInput('defect', v);
                            }}
                        />
                    </InputField>
                </Item>
            )}
            {props.pruning && (
                <Item title="Обрезки гр.">
                    <InputField>
                        <InputNumber
                            placeholder="Не обязательное поле"
                            value={params.state.pruning}
                            onChangeHandler={(v) => {
                                params.onChangeInput('pruning', v);
                            }}
                        />
                    </InputField>
                </Item>
            )}
        </Wrapper>
    );
};
