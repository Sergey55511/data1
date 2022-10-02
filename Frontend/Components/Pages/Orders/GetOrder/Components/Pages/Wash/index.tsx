import { Button, DatePicker, Input, notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { prepareDataTable } from '../../../../../../../../Shared/Helpers';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { Wrapper } from './style';

interface iState {
    date?: moment.Moment;
    widthIn?: number;
    losses?: number;
}
export const Wash = ({ record }: { record: iData }) => {
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
        if (state.losses! < 0) return false;
        return true;
    })();

    const subbmitHandler = async () => {
        const data: iData[] = [
            {
                ...record,
                widthOut: undefined,
                widthIn: state.widthIn,
                stateId: 1,
            },
        ];
        if (state.losses) {
            data.push({
                ...record,
                workpieceTypeId: 9,
                widthOut: undefined,
                widthIn: +state.losses.toFixed(2),
                stateId: undefined,
            });
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
                        placeholder='Введите данные'
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
                onClick={subbmitHandler}
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
