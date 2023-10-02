import { useMutation } from '@tanstack/react-query';
import { Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import { iData, iDataTable } from '../../../../../../../../Shared/Types/interfaces';
import { postOrderResult } from '../../../../../../../Store/OperationStore/Api';
import { ROUTES } from '../../../../../constants';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
export interface iProps {
    record: iData;
}
export const useProps = ({ record }: iProps) => {
    const router = useRouter();
    const onOk = () => {
        const getNumber = (v: any) => (v ? Math.abs(+v) : 0);
        const preparedRecord: iDataTable = {
            ...record,
            task: undefined,
            widthIn: undefined,
            moneyIn: undefined,
            countItemsOut: undefined,
            widthOut: getNumber(record.width) * -1,
            moneyOut: getNumber(record.code) * -1,
            countItemsIn: getNumber(record.count),
        };
        returnHandler.mutate([preparedRecord]);
    };
    const onClickHandler = () => {
        confirm({
            title: 'Вы увеврены, провести 100% возврат?',
            icon: <ExclamationCircleOutlined />,
            content: 'Отменить возврата будет невозможно',
            onOk,
        });
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
