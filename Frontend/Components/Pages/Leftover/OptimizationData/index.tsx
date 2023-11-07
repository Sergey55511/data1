import { useMutation } from '@tanstack/react-query';
import { Button, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { dataOptimization } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';

export const OptimizationData = observer(() => {
    const { loginStore } = useStores();
    const optimize = useMutation(dataOptimization, {
        onSuccess: () => {
            notification.success({ message: 'Дата оптимизирована успешно' });
        },
    });

    if (loginStore.user.status != 'admin') return null;
    return (
        <Button
            type="primary"
            loading={optimize.isLoading}
            onClick={() => optimize.mutate()}
        >
            Oтимизировать данные
        </Button>
    );
});
