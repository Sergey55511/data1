import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { iData, iDataTable } from '../../../../../../../../Shared/Types/interfaces';
import { postOrderResult } from '../../../../../../../Store/OperationStore/Api';
import { ROUTES } from '../../../../../constants';

export interface iProps {
    record: iData;
}
export const useProps = ({ record }: iProps) => {
    const router = useRouter();

    const onClickHandler = () => {
        const preparedRecord: iDataTable = {
            ...record,
            widthIn: record.width,
            moneyIn: record.code,
            countItemsIn: record.count,
        };
        returnHandler.mutate([preparedRecord]);
    };
    const returnHandler = useMutation(postOrderResult, {
        onSuccess: () => {
            notification.success({
                message: 'Возврат прошел успешно',
            });
            router.push(ROUTES.orders);
        },
        onError: () => {
            notification.error({
                message: 'Что то пошло не так, обратитесь к администратору',
            });
        },
    });
    return { onClickHandler, returnHandler };
};
