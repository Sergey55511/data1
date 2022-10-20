import { Button, DatePicker, Input, notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { STATE, WORKPIECETYPE } from '../../../../../../../../Shared/constants';
import { prepareDataTable } from '../../../../../../../../Shared/Helpers';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { getLosseObject } from '../../../../../../Helpers';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { Wrapper } from './style';

export interface iProps {
    record: iData;
    stateId: number;
    isCheckLosses?: boolean;
}

interface iState {
    date?: moment.Moment;
    widthIn?: number;
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
        if (state.losses) {
            data.push(getLosseObject(record, WORKPIECETYPE.losses.id, state.losses));
        }

        const dataTable = data.map((item) => prepareDataTable(item));
        setIsLoading(true);
        await OperationStore.postOrderResult(dataTable);
        notification.success({
            message: 'Сохранение прошло успешно',
        });
        router.push('/orders');
        setIsLoading(false);
    };

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
                <>
                    <Input
                        type="number"
                        className="input"
                        value={state.widthIn}
                        placeholder="Введите данные"
                        step={0.01}
                        onChange={(v) => {
                            const value = v.target.value;
                            setState((prev) => ({
                                ...prev,
                                widthIn: value ? +value : undefined,
                                losses: (record?.widthOut || 0) - +value! || 0,
                            }));
                        }}
                    />
                    {(state.widthIn || 0) < 0 && (
                        <div className="error">
                            <small>Отрицательное значение</small>
                        </div>
                    )}
                </>
            </Item>
            <Item title="Потеря гр.">
                <>
                    <Input className="input" value={state.losses?.toFixed(2)} disabled />
                    {(state.losses || 0) < 0 && (
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
