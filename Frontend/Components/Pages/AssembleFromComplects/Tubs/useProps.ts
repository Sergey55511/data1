import { useMutation, useQuery } from '@tanstack/react-query';
import { notification } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { OPERATIONS, WORKPIECETYPE } from '../../../../../Shared/constants';
import { iData, iDataProduct } from '../../../../../Shared/Types/interfaces';
import { getManagers } from '../../../../Store/Lists/api';
import { postAssembleComplect } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { tValue } from '../../../Shared/InputNumber';
import { useProps as useRootProps, eTypeButton } from '../useProps';

export const useProps = (props: ReturnType<typeof useRootProps>) => {
    const complect = props.complect ? props.complect[0] : undefined;
    const getNumber = (v: any) => (v ? +v : 0);

    const minaret = props.complectItems.find(
        (item) => item.workpieceTypeId == WORKPIECETYPE.minaret.id,
    );

    // const disabled = (() => {
    //     if (!managerId) return true;
    //     if (!length) return true;
    //     if (!width) return true;
    //     if (getNumber(minaret?.widthOut) > getNumber(minaret?.width)) return true;
    //     if (getNumber(minaret?.countItemsOut) > getNumber(minaret?.count)) return true;
    //     if (!minaret?.widthOut) return true;
    //     if (!minaret.countItemsOut) return true;
    //     return false;
    // })();

    const validateWidth = () => {
        const minaretWidthOut = getNumber(minaret?.widthOut);
        const complectWidth = getNumber(complect?.width);
        const widthResult = getNumber(props.width);

        if (widthResult < minaretWidthOut + complectWidth) {
            throw new Error('Вес готового изделия меньше комплекта + минарета');
        }
    };

    const subbmitFetch = useMutation(
        () => {
            if (!minaret) {
                throw new Error('Минарет не выбран');
            }
            validateWidth();

            const minaretClone: iData = JSON.parse(JSON.stringify(minaret));

            const moneyOut =
                (getNumber(minaretClone.code) / getNumber(minaretClone.width)) *
                    getNumber(minaretClone.widthOut) || 0;

            const articleId = complect?.articleId;

            return postAssembleComplect({
                complect,
                minaret: {
                    ...minaretClone,
                    moneyOut,
                    articleId,
                    managerId: props.managerId,
                },
                model: props.model,
                length: props.length,
                width: props.width,
            });
        },
        {
            onSuccess: () => {
                notification.success({ message: 'Сборка прошла умпешно' });
                props.resetRootState();
                props.setLength(undefined);
                props.setWidth(undefined);
            },
            onError: (err) => {
                const error = err as Error;
                const description = error.message || 'Свяжитель с администратором';
                notification.error({
                    message: 'Ошибка',
                    description,
                });
            },
        },
    );

    const subbmitHandler = () => {
        subbmitFetch.mutate();
    };
};
