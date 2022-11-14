import { useState } from 'react';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { InputField } from '../../../../../../Shared/InputField';
import { tValue } from '../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../Shared/SelectField';
import { Title } from '../../Shared/Title';
import { Row } from './Components/Row';
import { Wrapper } from './style';

interface iField {
    key: string;
    placeholder: string;
    value: string | number;
    isError: boolean;
    isReqired: boolean;
}
export interface iState {
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    length: iField;
    sizeRangeId: iField;
    widthIn: iField;
}

export const MakeBall = ({ record, stateId }: { record: iData; stateId: number }) => {
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const { ListsStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [defect, setDefect] = useState<tValue>(undefined);
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const subbmitHandler = () => console.log('subbmitHandler');
    const addRowHandler = () => console.log('addRowHandler');
    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            prev[index][fieldName].value = v;
            return [...prev];
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
                    <Row
                        key={index}
                        isLoading={isLoading}
                        fields={[
                            <InputField
                                key="workpieceTypeId"
                                isError={item.workpieceTypeId.isError}
                            >
                                <SelectField
                                    placeholder={item.workpieceTypeId.placeholder}
                                    value={+item.workpieceTypeId.value || undefined}
                                    onChange={(v) =>
                                        onChange(v, index, 'workpieceTypeId')
                                    }
                                    options={ListsStore.workpieceType?.map((item) => ({
                                        value: item.id,
                                        caption: item.workpieceType,
                                    }))}
                                />
                            </InputField>,
                        ]}
                        removeRow={() => console.log('removeRow')}
                    />
                ))}
            </div>
        </Wrapper>
    );
};
