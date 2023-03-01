import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { UseQueryResult } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
import { tRecipientType, useData } from './useData';
import { useStores } from '../../../../Store/useStores';
import { OPERATIONS } from '../../../../../Shared/constants';

export interface iProps {
    selectedRows: iDataProduct[];
    products: UseQueryResult<iDataProduct[], unknown>;
    setSelectedRows: (value: SetStateAction<iDataProduct[]>) => void;
}

export const useProps = (props: iProps) => {
    const { loginStore } = useStores();
    const [recipientType, setRecipientType] = useState<tRecipientType>();
    const params = useData({ ...props, recipientType }, setRecipientType);
    const isShowAddInput = recipientType == 'recipientsOuter';
    const isShowNumDocument = ['recipientsOuter', 'recipientsInternal'].includes(
        recipientType ?? '',
    );
    const isShowRecipient = isShowNumDocument;

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
            operationId:
                recipientType == 'recipientsInternal'
                    ? OPERATIONS.shareItems.id
                    : OPERATIONS.sale.id,
            userId: loginStore.user.id,
            storeId: loginStore.user.storeId,
            recipientId: params.recipientId,
            numDocument: `${params.numDocument}_${Date.now()}`,
            widthOut: item.width,
            countItemsOut: item.count,
            moneyOut: item.code,
        }));

        await params.postData.mutate(data);
    };

    return {
        reAssembleHandler,
        moveOutAssembleHandler,
        isShowAddInput,
        isShowNumDocument,
        recipientType,
        setRecipientType,
        isShowRecipient,
        ...params,
    };
};
