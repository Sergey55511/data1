import { Button, DatePicker, Divider, Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { SetStateAction, useState } from 'react';
import { iLeftovers } from '../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../Store/useStores';
import { MyDrawer } from '../../../../../Shared/MyDrawer';
import { KEYSLEFTOVERS } from '../../constants';
import { NumProduction } from '../NumProduction';
import { Wrapper } from './style';

type tConstKeys = keyof typeof KEYSLEFTOVERS;
type tValue = number | string | undefined;
export const MoveOutSolo = observer(
    ({ record, onClose }: { record: iLeftovers; onClose?: () => void }) => {
        const { OperationStore } = useStores();
        const [numProd, setNumProd] = useState(0);
        const [operation, setOperation] = useState<number | undefined>(undefined);
        const [isLoading, setIsLoading] = useState(false);
        const [width, setWidth] = useState<tValue>(undefined);
        const [count, setCount] = useState<tValue>(undefined);
        const [date, setDate] = useState<moment.Moment | null>(null);
        const keys = Object.keys(record);

        const setNumProduction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            MyDrawer({
                title: 'Производства',
                content: <NumProduction setValue={(v: number) => setNumProd(v)} />,
            });
        };

        const getValue = (v: string) => (isNaN(+v) ? undefined : +v);
        const setValue = (v: tValue, set: (value: SetStateAction<tValue>) => void) => {
            set((prev) => {
                if (!v) return undefined;
                v = `${v}`.replace(',', '.');
                const regexp = /^\d+[.|,]\d+$|^\d+[.|,]$|^\d+$/;

                if (regexp.test(v as string)) return v;

                if (getValue(v as string) == undefined) return prev ? prev : '';
                return v;
            });
        };

        const isValid = (() => {
            const test = (v: tValue) => /^\d+[.|,]$/.test(v as string);
            const isMinus = (recordValue: number, stateValue: tValue) => {
                if (stateValue) if ((recordValue ?? 0) - +stateValue < 0) return true;
            };

            if (test(width)) return false;
            if (test(count)) return false;
            if (isMinus(record.width!, width)) return false;
            if (count) if ((record.count ?? 0 - +count) < 0) return false;
            return operation && date && (width || count) ? true : false;
        })();

        const subbmitHandler = () => {
            setIsLoading(true);
            OperationStore.moveToWork(
                    {
                        modelId: record.modelId,
                        colorId: record.colorId,
                        lengthId: record.lengthId,
                        stateId: record.stateId,
                        channelId: record.channelId,
                        lot: record.lot,
                        gradeId: record.gradeId,
                        materialGroupId: record.materialGroupId,
                        sizeRangeId: record.sizeRangeId,
                        workpieceTypeId: record.workpieceTypeId,
                        date,
                        countItemsOut: count as number,
                        widthOut: width as number,
                        operationId: operation,
                        productionId: numProd,
                    },
                () => {
                    setIsLoading(false);
                    // if (onClose) onClose();
                },
            );
        };

        return (
            <Wrapper>
                <div className="flex">
                    {keys
                        .filter((key) => {
                            const field = KEYSLEFTOVERS[key as tConstKeys]?.key;
                            if (
                                [
                                    KEYSLEFTOVERS.width.key,
                                    KEYSLEFTOVERS.count.key,
                                    KEYSLEFTOVERS.numProduction.key,
                                ].includes(field)
                            )
                                return false;
                            return KEYSLEFTOVERS[key as tConstKeys]?.title;
                        })
                        .map((key) => {
                            return (
                                <div key={key} className="item">
                                    <h3>{KEYSLEFTOVERS[key as tConstKeys].title}</h3>
                                    <p>{record[key as keyof iLeftovers] as string}</p>
                                </div>
                            );
                        })}
                </div>
                <Divider />
                <DatePicker
                    placeholder="Дата операции"
                    style={{ width: '100%' }}
                    value={date}
                    onChange={(v) => setDate(v)}
                    allowClear
                />
                <Divider />
                <Select
                    style={{ width: '100%' }}
                    placeholder="Операция"
                    value={operation}
                    onChange={(v) => setOperation(v)}
                    showSearch
                >
                    {OperationStore.operations?.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.opereytion}
                        </Select.Option>
                    ))}
                </Select>
                <Divider />
                <div className="flex">
                    <div className="item">
                        <h3>{KEYSLEFTOVERS.width.title}</h3>
                        <p>{record.width}</p>
                    </div>
                    <div className="item">
                        <h3>{KEYSLEFTOVERS.count.title}</h3>
                        <p>{record.count}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="item">
                        <div>
                            <Input
                                placeholder="Выдать"
                                disabled={!record.width}
                                value={width}
                                onChange={(e) => setValue(e.target.value, setWidth)}
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div>
                            <Input
                                placeholder="Выдать"
                                disabled={!record.count}
                                value={count}
                                onChange={(e) => setValue(e.target.value, setCount)}
                            />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="flex">
                    <div className="itemNumProduction">
                        <div>
                            {record.numProduction ? (
                                <div>№ ПП {record.numProduction}</div>
                            ) : (
                                <a href="#" onClick={setNumProduction}>
                                    {numProd
                                        ? `№ производства ${numProd}`
                                        : 'Выбрать номер производства'}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <Divider />
                <div>
                    <Button
                        type="primary"
                        disabled={!isValid}
                        onClick={subbmitHandler}
                        loading={isLoading}
                    >
                        Выдать
                    </Button>
                </div>
            </Wrapper>
        );
    },
);
