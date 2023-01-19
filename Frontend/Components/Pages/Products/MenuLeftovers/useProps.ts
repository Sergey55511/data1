import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { UseQueryResult } from '@tanstack/react-query';
import { SetStateAction, useRef, useState } from 'react';
import { tRecipientType, useData } from './useData';
import { useStores } from '../../../../Store/useStores';

export interface iProps {
    selectedRows: iDataProduct[];
    products: UseQueryResult<iDataProduct[], unknown>;
    setSelectedRows: (value: SetStateAction<iDataProduct[]>) => void;
}

export const useProps = (props: iProps) => {
    const { loginStore } = useStores();
    const [recipientType, setRecipientType] =
        useState<tRecipientType>('recipientsInternal');
    const params = useData({ ...props, recipientType });

    const setTrueIsShowRecipient = (recipientTypeValue: tRecipientType) => {
        setRecipientType(recipientTypeValue);
        params.setIsShowRecipient(true);
    };

    const reAssembleHandler = async () => {
        const articles = props.selectedRows.map((item) => item.articleId || 0);
        params.takeApartHandler.mutate({
            articles,
            managerId: params.managerId!,
        });
    };

    const moveOutAssembleHandler = async () => {
        const data = props.selectedRows.map((item) => ({
            ...item,
            userId: loginStore.user.id,
            storeId: loginStore.user.storeId,
            recipientId: params.recipientId,
            widthOut: item.width,
            countItemsOut: item.count,
            moneyOut: item.code,
        }));

        await params.postData.mutate(data);
    };

    return {
        reAssembleHandler,
        moveOutAssembleHandler,
        setTrueIsShowRecipient,
        recipientType,
        ...params,
    };
};
