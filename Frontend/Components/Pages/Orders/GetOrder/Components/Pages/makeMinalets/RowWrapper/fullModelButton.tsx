import { Dispatch, SetStateAction, useState } from 'react';
import { iState } from '../useProps';
import { Button } from 'antd';
import { ModalFullModel } from './ModalFullModel';

export const FullModelButton = ({
    state,
    setState,
    index,
    onChange,
}: {
    state: iState;
    setState: Dispatch<SetStateAction<iState[]>>;
    index: number;
    onChange: (v: string | number, index: number, fieldName: keyof iState) => void;
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