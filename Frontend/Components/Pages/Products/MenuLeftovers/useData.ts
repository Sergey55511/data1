import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { OPERATIONS } from '../../../../../Shared/constants';
import { iAssembleTakeApartData } from '../../../../../Shared/Types/interfaces';
import { getManagers, getRecipient } from '../../../../Store/Lists/api';
import { assembleTakeApart } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { iProps } from './useProps';

export const useData = (props: iProps) => {
    const [isShowSelectUser, setIsShowSelectUser] = useState(false);
    const [isShowRecipient, setIsShowRecipient] = useState(false);
    const [managerId, setManagerId] = useState<number | undefined>();
    const { loginStore } = useStores();
    const takeApartHandler = useMutation(async (data: iAssembleTakeApartData) => {
        await assembleTakeApart(data);
        props.setSelectedRows([]);
        await props.products.refetch();
        setIsShowSelectUser(false);
        setManagerId(undefined);
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
    const recipients = useQuery(['recipients'], () => getRecipient(), {
        enabled: !!loginStore.user.storeId,
    });
    const recipientsInternal = useQuery(
        ['recipients', loginStore.user.storeId],
        () => getRecipient(loginStore.user.storeId),
        { enabled: !!loginStore.user.storeId },
    );

    return {
        takeApartHandler,
        managers,
        isShowSelectUser,
        setIsShowSelectUser,
        managerId,
        setManagerId,
        isShowRecipient,
        setIsShowRecipient,
        recipients,
        recipientsInternal,
    };
};
