import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { message } from 'antd';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { iDataProduct, iRecipient } from '../../../../../../Shared/Types/interfaces';
import { postRecipient } from '../../../../../Store/Lists/api';

export interface iProps {
    onCancel: () => void;
    submitHandler: () => Promise<void>;
    isLoading?: boolean;
    recipientId: number | undefined;
    setRecipientId: Dispatch<SetStateAction<number | undefined>>;
    numDocument: string;
    setNumDocument: Dispatch<SetStateAction<string>>;
    recipient: UseQueryResult<iRecipient[], unknown>;
    isShowAddInput?: boolean;
    isShowNumDocument?: boolean;
    selectedRows: iDataProduct[];
    date: moment.Moment | null | undefined;
    setDate: Dispatch<SetStateAction<moment.Moment | null | undefined>>;
}

export const useProps = (props: iProps) => {
    const [newRecipient, setNewRecipient] = useState('');
    const addRecipient = useMutation(async () => {
        if (newRecipient) await postRecipient([{ recipient: newRecipient }]);
    });

    const addRecipientHandler = async () => {
        await addRecipient.mutate();
        setNewRecipient('');
        props.setRecipientId(undefined);
        props.recipient.refetch();
    };

    const setNumDocumentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.split('/').length > 1) {
            message.error('Не допустим ввод символа /');
            return;
        }
        props.setNumDocument(e.target.value);
    };

    const disabled = !(props.recipientId && props.numDocument && props.date);
    return {
        newRecipient,
        setNewRecipient,
        addRecipientHandler,
        addRecipient,
        setNumDocumentHandler,
        disabled,
    };
};
