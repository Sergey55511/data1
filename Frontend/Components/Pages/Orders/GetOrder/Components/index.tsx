import { Sorting } from './Pages/Sorting';
import { Wash } from './Pages/Wash';

export const GetOrderSwitcher = ({ operationId }: { operationId: number }) => {
    switch (operationId) {
        case 1:
            return <Wash />;
        case 2:
            return <Sorting />;
    }
    return <></>;
};
