import { STATE } from '../../../../../../../Shared/constants';
import { iData } from '../../../../../../../Shared/Types/interfaces';
import { MoveOutSolo } from './moveOutSolo';

export interface iProps {
    record: iData;
    onClose?: () => void;
    isShowCount?: boolean;
    isShowTask?: boolean;
}

export const MoveOutSoloHoc = (props: iProps) => {
    let isShowTask = false;
    let isShowCount = false;

    if ([STATE.sortedLength.id].includes(props.record?.stateId || 0)) {
        isShowTask = true;
    }

    return <MoveOutSolo {...{ ...props, isShowTask, isShowCount }} />;
};
