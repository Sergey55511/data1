import { STATE } from '../../../../../../../Shared/constants';
import { iData } from '../../../../../../../Shared/Types/interfaces';
import { MoveOutSolo } from './moveOutSolo';

export interface iProps {
    record: iData;
    onClose?: () => void;
    isShowCount?: boolean;
    isShowTask?: boolean;
    validationFields?: {
        count?: boolean;
        numProduction?: boolean;
        task?: boolean;
    };
}

export const MoveOutSoloHoc = (props: iProps) => {
    if ([STATE.sortedLength.id].includes(props.record?.stateId || 0)) {
        return (
            <MoveOutSolo
                {...{
                    ...props,
                    isShowTask: true,
                    validationFields: { numProduction: true, task: true },
                }}
            />
        );
    }

    return <MoveOutSolo {...props} />;
};
