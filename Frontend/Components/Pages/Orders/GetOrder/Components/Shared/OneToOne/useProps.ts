import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    defect?: boolean;
    pruning?: boolean;
    isShowWorkingHours?: boolean;
}

interface iState {
    date?: moment.Moment;
    widthIn?: number;
    workingHours?: number;
    moveBack?: number;
    losses?: number;
    defect?: number;
    pruning?: number;
    channel?: number;
}

export const useProps = ({
    isCheckLosses,
    isShowChannel,
    record,
    stateId,
    isShowWorkingHours,
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
    });

    const isValid = (() => {
        if (!state.date || !state.widthIn) return false;
        if (isShowWorkingHours) {
            if (!state.workingHours) {
                return false;
            }
        }
        if (state.widthIn! < 0) return false;

        if (isCheckLosses) {
            if (state.losses! < 0) return false;
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

        const data: iData[] = [
            {
                ...record,
                workingHours: state.workingHours,
                date: state.date,
                widthOut: undefined,
                widthIn: state.widthIn,
                stateId: stateId,
                moneyIn: code,
                channelId: state.channel,
            },
        ];

        sendData({
            data,
            defect: state.defect,
            pruning: state.pruning,
            moveBack: state.moveBack,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult.bind(OperationStore),
            router,
            losses: state.losses,
        });
    };

    const onChangeInput = (fieldName: keyof iState, v: any) => {
        const keys = Object.keys(state).filter((item) => item != fieldName);

        if (v == '') return;
        setState((prev) => {
            return {
                ...prev,
                [fieldName]: v,
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
