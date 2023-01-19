import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { OPERATIONS } from '../../../../../Shared/constants';
import {
    iAssembleTakeApartData,
    iDataProduct,
} from '../../../../../Shared/Types/interfaces';
import { getManagers, getRecipient } from '../../../../Store/Lists/api';
import { assembleTakeApart, postDataProduct } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { iProps } from './useProps';

export type tRecipientType = 'recipientsOuter' | 'recipientsInternal';

interface iDataProps extends iProps {
    recipientType: tRecipientType;
}
export const useData = (props: iDataProps) => {
    const [isShowSelectUser, setIsShowSelectUser] = useState(false);
    const [isShowRecipient, setIsShowRecipient] = useState(false);
    const [managerId, setManagerId] = useState<number | undefined>();
    const [recipientId, setRecipientId] = useState<number | undefined>();
    const { loginStore } = useStores();
    props.recipientType;
    const resetState = async () => {
        props.setSelectedRows([]);
        await props.products.refetch();
        setIsShowSelectUser(false);
        setIsShowRecipient(false);
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
        setIsShowSelectUser,
        managerId,
        setManagerId,
        recipientId,
        setRecipientId,
        isShowRecipient,
        setIsShowRecipient,
        recipients,
        postData,
    };
};
