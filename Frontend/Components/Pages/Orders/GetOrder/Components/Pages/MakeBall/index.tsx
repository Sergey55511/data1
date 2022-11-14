import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import {
    iData,
    iField,
    iSizeRange,
} from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import {
    getTotalSum,
    validation,
    sendData,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { tValue } from '../../../../../../Shared/InputNumber';
import { Title } from '../../Shared/Title';
import { RowWrapper } from './Components/RowWrapper';
import { Wrapper } from './style';

export interface iState {
    sizeRange: iField;
    length: iField;
    widthIn: iField;
}

export const MakeBall = ({ record, stateId }: { record: iData; stateId: number }) => {
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const { ListsStore, loginStore, OperationStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [defect, setDefect] = useState<tValue>(undefined);
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [sizeRange, setSizeRange] = useState<iSizeRange[]>([]);

    const router = useRouter();

    useEffect(() => {
        const totalSum = getTotalSum(state);
        const res =
            (record?.widthOut || 0) -
            totalSum -
            (defect ? +defect : 0) -
            (moveBack ? +moveBack : 0);
        setLosses(isNaN(res) ? 0 : res);
    }, [state, defect, moveBack]);

    useEffect(() => {
        const getSizeRange = async () => {
            if (loginStore.user.storeId) {
                let sizeRange: iSizeRange[] = await ListsStore.getSizeRange({
                    storeId: loginStore.user.storeId,
                    operationId: OPERATIONS.makeBall.id,
                });
                let sizeRangeRecord = sizeRange.find(
                    (item) => item.id == record.sizeRangeId,
                );

                const sizeRecord = sizeRangeRecord ? sizeRangeRecord.size : 9999;

                sizeRange = sizeRange.filter((item) => item.size <= sizeRecord);

                setSizeRange(sizeRange);
            }
        };
        getSizeRange();
    }, [loginStore.user.storeId]);

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    sizeRange: new Field('sizeRangeId', 'Размерный ряд'),
                    length: new Field('length', 'Длинна', false),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
        });
    };

    const subbmitHandler = async () => {
        const errorNote = () => {
            notification.error({
                message: 'Ошибка!',
                description: 'Не верно заполнены поля!',
            });
        };
        if (!state.length) {
            errorNote();
            return;
        }

        const isError = validation(setState);

        if (isError) {
            errorNote();
            return;
        }

        const totalSum = getTotalSum(state);
        if (!totalSum) {
            errorNote();
            return;
        }
        if (losses < 0) {
            errorNote();
            return;
        }
        const code = record.code ? record.code * -1 : 0;
        const codeOneItem = record.width ? code / totalSum : 0;
        const data: iData[] = state.map((item) => ({
            ...record,
            lengthId: item.length.value ? +item.length.value : undefined,
            sizeRangeId: +item.sizeRange.value,
            widthOut: undefined,
            widthIn: +item.widthIn.value!,
            stateId,
            moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
        }));
        sendData({
            data,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult,
            router,
            defect,
            losses,
            moveBack,
        });
    };

    return (
        <Wrapper>
            <Title
                subbmitHandler={subbmitHandler}
                addRowHandler={addRowHandler}
                setMoveBack={setMoveBack}
                moveBack={moveBack}
                setDefect={setDefect}
                defect={defect}
                losses={losses}
                isLoading={isLoading}
            />
            <div>
                {state.map((item, index) => (
                    <RowWrapper
                        key={index}
                        state={item}
                        index={index}
                        isLoading={isLoading}
                        onChange={onChange}
                        sizeRange={sizeRange}
                        storeId={loginStore.user.storeId}
                    />
                ))}
            </div>
        </Wrapper>
    );
};
