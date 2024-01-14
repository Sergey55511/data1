import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GRADE, OPERATIONS } from '../../../../../../../../Shared/constants';
import { round } from '../../../../../../../../Shared/Helpers';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { getCode, sendData } from '../../../../../../Helpers';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { useData } from './useData';

export interface iProps {
    record: iData;
    stateId: number;
    isShowChannel?: boolean;
    isCheckLosses?: boolean;
    isCheckGarbage?: boolean;
    defect?: boolean;
    pruning?: boolean;
    garbage?: boolean;
    isShowWorkingTimeFact?: boolean;
}

interface iState {
    date?: moment.Moment;
    widthIn?: number;
    workingTimeFact?: number;
    moveBack?: number;
    losses?: number;
    defect?: number;
    garbage?: number;
    pruning?: number;
    channel?: number;
}

export const useProps = ({
    isCheckLosses,
    isCheckGarbage,
    isShowChannel,
    record,
    stateId,
    isShowWorkingTimeFact,
}: iProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { OperationStore } = useStores();
    const [state, setState] = useState<iState>({
        date: moment(),
        widthIn: undefined,
        losses: undefined,
        defect: undefined,
        pruning: undefined,
        channel: undefined,
        garbage: undefined,
    });

    const isValid = (() => {
        if (!state.date || !state.widthIn) return false;
        if (isShowWorkingTimeFact) {
            if (!state.workingTimeFact) {
                return false;
            }
        }
        if (state.widthIn! < 0) return false;

        if (isCheckLosses) {
            if (state.losses! < 0) return false;
        }
        if (isCheckGarbage) {
            return !!state.garbage;
        }
        if (isShowChannel) {
            if (!state.channel) return false;
        }
        return true;
    })();

    const confirmSubbmit = () => {
        confirmAction({ subbmitHandler });
    };

    const subbmitHandler = async () => {
        const code = getCode(record.code, record.width, state.moveBack, state.pruning);
        const channelId = state.channel ? state.channel : record.channelId;
        const gradeId = (() => {
            const isResetGradeId = record.operationId == OPERATIONS.slicingBillets.id;
            return isResetGradeId ? GRADE.mix.id : record.gradeId;
        })();

        const data: iData[] = [
            {
                ...record,
                workingTimeFact: state.workingTimeFact,
                date: state.date,
                widthOut: undefined,
                widthIn: state.widthIn,
                stateId: stateId,
                moneyIn: code,
                channelId,
                gradeId,
            },
        ];

        sendData({
            data,
            defect: state.defect,
            pruning: state.pruning,
            moveBack: state.moveBack,
            garbage: state.garbage,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult.bind(OperationStore),
            router,
            losses: state.losses,
            stateId,
        });
    };

    const onChangeInput = (fieldName: keyof iState, v: any) => {
        const value = +v < 0 ? '' : v;

        setState((prev) => {
            return {
                ...prev,
                [fieldName]: value,
            };
        });
    };

    useEffect(() => {
        const getValue = (v?: number) => v || 0;
        setState((prev) => {
            let losses =
                getValue(record.widthOut) -
                getValue(prev.defect) -
                getValue(prev.moveBack) -
                getValue(prev.pruning) -
                getValue(prev.garbage) -
                getValue(prev.widthIn);

            losses = round(losses);
            if (losses == prev.losses) return prev;
            return {
                ...prev,
                losses,
            };
        });
    }, [state]);

    const isShowLosses = (state.losses || 0) < 0 && isCheckLosses;

    const data = useData();

    const channelOptions = data.channel.data?.map((item) => ({
        value: item.id,
        caption: item.channel,
    }));

    return {
        isShowLosses,
        state,
        isLoading,
        isValid,
        confirmSubbmit,
        setState,
        onChangeInput,
        data,
        channelOptions,
    };
};
