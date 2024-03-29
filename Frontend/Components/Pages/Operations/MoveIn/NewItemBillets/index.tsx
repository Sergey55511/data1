import { Button, DatePicker, Input, Tooltip } from 'antd';
import { Title } from '../../../../Shared/Title';
import { useProps } from './useProps';
import { Wrapper } from './style';
import { InputNumber } from '../../../../Shared/InputNumber';
import { InputField } from '../../../../Shared/InputField';
import { RowWrapper } from './RowWrapper';
import { disabledDateAfterToday } from '../../../../Helpers';

export const NewItemBillets = () => {
    const props = useProps();

    return (
        <Wrapper>
            <Title
                text="Приход заготовок:"
                content={
                    <div className="inputWrapper">
                        <Tooltip
                            placement="top"
                            title={`Макс партия: ${props.data.maxLot.data || 0}`}
                            open={props.isShowLot}
                        >
                            <InputField
                                isError={props.isValidated && !props.lot}
                                width="150px"
                            >
                                <InputNumber
                                    value={props.lot}
                                    placeholder="Партия"
                                    onChangeHandler={(v) => props.setLot(v)}
                                    width={300}
                                    allowClear
                                    onFocus={() => props.setIsShowLot(true)}
                                    onBlur={() => props.setIsShowLot(false)}
                                />
                            </InputField>
                        </Tooltip>
                        <InputField
                            isError={props.isValidated && !props.numDocument}
                            width="150px"
                        >
                            <Input
                                value={props.numDocument}
                                placeholder="Накладная"
                                onChange={(e) => props.setNumDocument(e.target.value)}
                                width={300}
                                allowClear
                            />
                        </InputField>
                        <InputField
                            isError={props.isValidated && !props.date}
                            width="150px"
                        >
                            <DatePicker
                                className="input"
                                value={props.date}
                                onChange={(v) => props.setDate(v)}
                                format="DD.MM.YYYY"
                                disabledDate={disabledDateAfterToday}
                            />
                        </InputField>
                        <Button
                            type="primary"
                            onClick={props.subbmitHandler}
                            loading={props.data.submitMutation.isLoading}
                        >
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
                    <RowWrapper
                        key={index}
                        state={item}
                        index={index}
                        onChange={props.onChange}
                        copyRow={props.copyRow}
                        removeRow={props.removeRow}
                        onKeyDown={props.onKeyDown}
                        onFocus={props.onFocus}
                        refHandler={props.refHandler}
                    />
                ))}
            </div>
        </Wrapper>
    );
};
