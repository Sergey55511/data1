import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { iRecipient } from '../../../../../../Shared/Types/interfaces';
import { postRecipient } from '../../../../../Store/Lists/api';

export const useProps = (
    recipient: UseQueryResult<iRecipient[], unknown>,
    setRecipientId: Dispatch<SetStateAction<number | undefined>>,
) => {
    const [newRecipient, setNewRecipient] = useState('');
    const [numDocument, setNumDocument] = useState('');

    const addRecipient = useMutation(async () => {
        if (newRecipient) await postRecipient([{ recipient: newRecipient }]);
    });

    const addRecipientHandler = async () => {
        await addRecipient.mutate();
        setNewRecipient('');
        setRecipientId(undefined);
        recipient.refetch();
    };

    return {
        newRecipient,
        setNewRecipient,
        addRecipientHandler,
        addRecipient,
        numDocument,
        setNumDocument,
    };
};
