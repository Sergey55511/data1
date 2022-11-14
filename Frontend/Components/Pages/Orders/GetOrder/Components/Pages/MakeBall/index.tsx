import { useEffect, useState } from 'react';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import { iData, iSizeRange } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import { Title } from '../../Shared/Title';
import { RowWrapper } from './Components/RowWrapper';
import { Wrapper } from './style';

interface iField {
    key: string;
    placeholder: string;
    value: string | number;
    isError: boolean;
    isReqired: boolean;
}

export interface iState {
    sizeRange: iField;
    length: iField;
    widthIn: iField;
}

class Field implements iField {
    key;
    placeholder;
    value = '';
    isError = false;
    isReqired = true;
    constructor(key: string, placeholder: string, isReqired = true) {
        this.key = key;
        this.placeholder = placeholder;
        this.isReqired = isReqired;
    }
}

export const MakeBall = ({ record, stateId }: { record: iData; stateId: number }) => {
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const { ListsStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [defect, setDefect] = useState<tValue>(undefined);
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const subbmitHandler = () => console.log('subbmitHandler');
    const [sizeRange, setSizeRange] = useState<iSizeRange[]>([]);

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
