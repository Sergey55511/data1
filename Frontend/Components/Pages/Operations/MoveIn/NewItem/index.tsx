import { Button, DatePicker, Tooltip } from 'antd';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';
import { PrimeField } from './Components/fields';
import { observer } from 'mobx-react-lite';
import { Frame } from '../../../../Shared/Frame';
import { InputNumber } from '../../../../Shared/InputNumber';
import { Row } from '../../../../Shared/Row';
import { disabledDateAfterToday } from '../../../../Helpers';
import { InputField } from '../../../../Shared/InputField';
import { SelectField } from '../../../../Shared/SelectField';
import { useProps } from './useProps';

export const NewItem = observer(() => {
    const props = useProps();

    return (
        <Wrapper>
            <Title text="Приход сырья:" />
            <Frame legend="Общие данные">
                <div className="primeData">
                    <div>
                        <Tooltip
                            placement="top"
                            title={`Макс партия: ${props.maxLot || 0}`}
                        >
                            <div>
                                <PrimeField
                                    {...{
                                        primeData: props.primeData,
                                        setPrameValue: props.setPrameValue,
                                    }}
                                    fieldName={'lot'}
                                />
                            </div>
                        </Tooltip>
                        <PrimeField
                            {...{
                                primeData: props.primeData,
                                setPrameValue: props.setPrameValue,
                            }}
                            fieldName={'numDocument'}
                            type={props.primeData.numDocument.type}
                            step={props.primeData.numDocument.step}
                        />
                        <div>
                            <DatePicker
                                className="input"
                                value={props.date}
                                onChange={(v) => props.setDate(v)}
                                format="DD.MM.YYYY"
                                disabledDate={disabledDateAfterToday}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            onClick={() => props.subbmitHandler()}
                            loading={props.isLoading}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            </Frame>
            <div className="addRow">
                <a href="#" onClick={props.addRowHandler}>
                    Добавить строку
                </a>
            </div>
            {props.stateDuplicate.map((item, index) => (
                <Row
                    key={index}
                    copyRow={() => props.copyRow(index)}
                    removeRow={() => props.removeHandler(index)}
                    isDuplicate={item.duplicate}
                    fields={[
                        <InputField key="fractionId" isError={item.fractionId.isError}>
                            <SelectField
                                placeholder={item.fractionId.placeholder}
                                value={+item.fractionId.value || undefined}
                                onChange={(v) => props.onChange(index, v, 'fractionId')}
                                options={props.fraction.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.fraction,
                                }))}
                                selectProps={{
                                    disabled: props.fraction.isLoading,
                                    loading: props.fraction.isFetching,
                                }}
                            />
                        </InputField>,
                        <InputField key="gradeId" isError={item.materialGroupId.isError}>
                            <SelectField
                                placeholder={item.materialGroupId.placeholder}
                                value={+item.materialGroupId.value || undefined}
                                onChange={(v) =>
                                    props.onChange(index, v, 'materialGroupId')
                                }
                                options={props.materialGroup.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.materialGroup,
                                }))}
                                selectProps={{
                                    disabled: props.materialGroup.isLoading,
                                    loading: props.materialGroup.isFetching,
                                }}
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
                        <InputField key="widthIn" isError={item.widthIn.isError}>
                            <InputNumber
                                placeholder={item.widthIn.placeholder}
                                onChangeHandler={(v) => {
                                    props.onChange(index, v!, 'widthIn');
                                }}
                                value={item.widthIn.value || ''}
                                ref={(r) => props.refHandler(r, index)}
                                onKeyDown={props.onKeyDown}
                                onFocus={() => props.onFocus(index)}
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
        </Wrapper>
    );
});
