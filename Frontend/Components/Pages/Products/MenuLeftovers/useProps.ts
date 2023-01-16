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
    const params = useData(props);

    const reAssembleHandler = async () => {
        const articles = props.selectedRows.map((item) => item.articleId || 0);
        params.takeApartHandler.mutate({
            articles,
            managerId: params.managerId!,
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
        ...params,
    };
};
