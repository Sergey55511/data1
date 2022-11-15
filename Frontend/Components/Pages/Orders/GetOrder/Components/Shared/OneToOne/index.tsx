import { Button, DatePicker, Input } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { sendData } from '../../../../../../Helpers';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { InputField } from '../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../Shared/InputNumber';
import { Wrapper } from './style';

export interface iProps {
    record: iData;
    stateId: number;
    isCheckLosses?: boolean;
}

interface iState {
    date?: moment.Moment;
    widthIn?: number;
    moveBack?: number;
    losses?: number;
}

export const OneToOne = ({
    record,
    stateId,
    isCheckLosses = true,
}: {
    record: iData;
    stateId: number;
    isCheckLosses?: boolean;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { OperationStore } = useStores();
    const [state, setState] = useState<iState>({
        date: moment(),
        widthIn: undefined,
        losses: undefined,
    });

    const isValid = (() => {
        if (!state.date || !state.widthIn) return false;
        if (state.widthIn! < 0) return false;
        if (isCheckLosses) {
            if (state.losses! < 0) return false;
        }
        return true;
    })();

    const confirmSubbmit = () => {
        confirmAction({ subbmitHandler });
    };

    const subbmitHandler = async () => {
        const code = record.code ? record.code * -1 : 0;
        const data: iData[] = [
            {
                ...record,
                widthOut: undefined,
                widthIn: state.widthIn,
                stateId: stateId,
                moneyIn: code,
            },
        ];
        sendData({
            data,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult,
            router,
            losses: state.losses,
        });
    };

    const onChangeInput = (fieldName: keyof iState, v: any) => {
        const anotherFieldName: keyof iState =
            fieldName == 'moveBack' ? 'widthIn' : 'moveBack';
        setState((prev) => ({
            ...prev,
            [fieldName]: v ? +v : undefined,
            losses: (record?.widthOut || 0) - (+v! || 0) - (prev[anotherFieldName] || 0),
        }));
    };

    const isShowLosses = (state.losses || 0) < 0 && isCheckLosses;

    return (
        <Wrapper>
            <Item title="Дата">
                <DatePicker
                    className="input"
                    value={state.date}
                    onChange={(v) =>
                        setState((prev) => ({ ...prev, date: v ?? undefined }))
                    }
                />
            </Item>
            <Item title="Результат гр.">
                <InputField
                    isError={(state.widthIn || 0) < 0}
                    errorMsg="Отрицательное значение"
                >
                    <InputNumber
                        placeholder="Введите данные"
                        value={state.widthIn}
                        onChangeHandler={(v) => {
                            onChangeInput('widthIn', v);
                        }}
                    />
                </InputField>
            </Item>
            <Item title="Возврат гр.">
                <InputField>
                    <InputNumber
                        placeholder="Не обязательное поле"
                        value={state.moveBack}
                        onChangeHandler={(v) => {
                            onChangeInput('moveBack', v);
                        }}
                    />
                </InputField>
            </Item>
            <Item title="Потеря гр.">
                <>
                    <Input className="input" value={state.losses?.toFixed(2)} disabled />
                    {isShowLosses && (
                        <div className="error">
                            <small>Отрицательный остаток</small>
                        </div>
                    )}
                </>
            </Item>
            <Button
                loading={isLoading}
                type="primary"
                disabled={!isValid}
                onClick={confirmSubbmit}
            >
                Сохранить
            </Button>
        </Wrapper>
    );
};

const Item = ({ title, children }: { title: string; children: JSX.Element }) => {
    return (
        <div className="item">
            <h4>{title}</h4>
            {children}
        </div>
    );
};
