import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { UseQueryResult } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
import { useData } from './useData';

export interface iProps {
    selectedRows: iDataProduct[];
    products: UseQueryResult<iDataProduct[], unknown>;
    setSelectedRows: (value: SetStateAction<iDataProduct[]>) => void;
}

export const useProps = (props: iProps) => {
    const {
        takeApartHandler,
        isShowSelectUser,
        setIsShowSelectUser,
        managers,
        managerId,
        setManagerId,
    } = useData(props);

    const reAssembleHandler = async () => {
        const articles = props.selectedRows.map((item) => item.articleId || 0);
        takeApartHandler.mutate({
            articles,
            managerId: managerId!,
        });
    };

    const moveOutAssembleHandler = () => {
        const articles = props.selectedRows.map((item) => item.articleId);
        console.log('moveOutAssemble', articles);
    };

    const shareAssembleHandler = () => {
        const articles = props.selectedRows.map((item) => item.articleId);
        console.log('shareAssemble', articles);
    };

    return {
        reAssembleHandler,
        moveOutAssembleHandler,
        shareAssembleHandler,
        takeApartHandler,
        isShowSelectUser,
        setIsShowSelectUser,
        managerId,
        setManagerId,
        managers,
    };
};
