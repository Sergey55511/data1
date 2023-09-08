import { Dispatch, SetStateAction, useState } from 'react';
import { iState } from '../useProps';
import { Button } from 'antd';
import { ModalFullModel } from './ModalFullModel';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';

export const FullModelButton = ({
    state,
    setState,
    index,
    onChange,
    record,
}: {
    state: iState;
    setState: Dispatch<SetStateAction<iState[]>>;
    index: number;
    onChange: (v: string | number, index: number, fieldName: keyof iState) => void;
    record: iData;
}) => {
    const [isShowModalFullModel, setIsShowModalFullModel] = useState(false);

    return (
        <>
            {isShowModalFullModel && (
                <ModalFullModel
                    state={state}
                    setState={setState}
                    index={index}
                    onCancel={() => setIsShowModalFullModel(false)}
                    onChange={onChange}
                    record={record}
                />
            )}
            <Button
                key="fullModel"
                type="link"
                disabled={!state.workpieceType.value}
                onClick={() => setIsShowModalFullModel(true)}
            >
                {state.fullModelId.value
                    ? state.fullModelName
                    : state.fullModelId.placeholder}
            </Button>
        </>
    );
};
