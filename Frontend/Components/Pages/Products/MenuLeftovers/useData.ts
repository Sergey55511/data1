import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { OPERATIONS } from '../../../../../Shared/constants';
import {
    iAssembleTakeApartData,
    iDataProduct,
} from '../../../../../Shared/Types/interfaces';
import { getManagers, getRecipient } from '../../../../Store/Lists/api';
import { assembleTakeApart, postDataProduct } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { iProps } from './useProps';

export type tRecipientType = 'recipientsOuter' | 'recipientsInternal' | 'takeApart';

interface iDataProps extends iProps {
    recipientType?: tRecipientType;
}
export const useData = (
    props: iDataProps,
    setRecipientType: Dispatch<SetStateAction<tRecipientType | undefined>>,
) => {
    const [managerId, setManagerId] = useState<number | undefined>();
    const [recipientId, setRecipientId] = useState<number | undefined>();
    const [numDocument, setNumDocument] = useState('');
    const { loginStore } = useStores();

    const isShowSelectUser = props.recipientType == 'takeApart';

    const resetState = async () => {
        props.setSelectedRows([]);
        await props.products.refetch();
        setRecipientType(undefined);
        setManagerId(undefined);
        setRecipientId(undefined);
    };

    const takeApartHandler = useMutation(async (data: iAssembleTakeApartData) => {
        await assembleTakeApart(data);
        await resetState();
    });

    const managers = useQuery(
        ['managers', loginStore.user.storeId, OPERATIONS.assemble.id],
        () =>
            getManagers({
                storeId: loginStore.user.storeId,
                operationId: OPERATIONS.assemble.id,
            }),
        { enabled: !!loginStore.user.storeId },
    );
    const recipientsOuter = useQuery(['recipients'], () => getRecipient(), {
        enabled: !!loginStore.user.storeId,
    });
    const recipientsInternal = useQuery(
        ['recipients', loginStore.user.storeId],
        () => getRecipient(loginStore.user.storeId),
        { enabled: !!loginStore.user.storeId },
    );

    const recipients =
        props.recipientType == 'recipientsOuter' ? recipientsOuter : recipientsInternal;

    const postData = useMutation(async (data: iDataProduct[]) => {
        await postDataProduct(data);
        await resetState();
    });

    return {
        takeApartHandler,
        managers,
        isShowSelectUser,
        managerId,
        setManagerId,
        recipientId,
        setRecipientId,
        recipients,
        postData,
        numDocument,
        setNumDocument,
    };
};
