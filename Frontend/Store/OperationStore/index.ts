import { notification } from 'antd';
import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from '../ErrorStore';
import {
    iError,
    iData,
    iNewItems,
    iOperation,
    iProductions,
    iUser,
    iDataTable,
    iManager,
} from '../../../Shared/Types/interfaces';
import { Login } from '..';

export class OperationStore {
    users: iUser[] = [];
    managers: iManager[] = [];
    operations: iOperation[] = [];
    productions: iProductions[] = [];
    leftovers: iData[] = [];
    orders: iData[] = [];
    errorStore: ErrorStore;
    loginStore: Login;
    maxLot = 0;
    constructor(errorStore: ErrorStore, login: Login) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
        this.loginStore = login;
    }

    getOperations = flow(function* (this: OperationStore, storeId: number) {
        try {
            this.operations = yield api.getOperations(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getProductions = flow(function* (this: OperationStore, storeId: number) {
        try {
            this.productions = yield api.getProductions(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getUsers = flow(function* (this: OperationStore, storeId: number) {
        try {
            this.users = yield api.getUsers(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getManagers = flow(function* (
        this: OperationStore,
        storeId: number,
        operationId: number,
    ) {
        try {
            this.managers = yield api.getManagers(storeId, operationId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    resetManagers = () => {
        this.managers = [];
    };
    postProductions = flow(function* (this: OperationStore, description: string) {
        const storeId = this.loginStore.user.storeId;
        try {
            yield api.postProductions({ description, storeId });
            yield this.getProductions(this.loginStore.user.storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getLeftovers = flow(function* (this: OperationStore, storeId: number) {
        try {
            this.leftovers = yield api.leftovers(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getMaxLot = flow(function* (this: OperationStore) {
        try {
            this.maxLot = yield api.getMaxLot();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getOrders = flow(function* (this: OperationStore, storeId: number) {
        try {
            this.orders = yield api.getOrders(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getOrder = flow(function* (this: OperationStore, pp: number) {
        try {
            return yield api.getOrder(pp);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    postNewItems = flow(function* <T>(
        this: OperationStore,
        data: T[],
        callBack?: () => void,
    ) {
        try {
            yield api.postNewItems(data);
            yield this.getMaxLot();
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    moveToWork = flow(function* (
        this: OperationStore,
        data: iDataTable,
        callBack?: () => void,
    ) {
        try {
            yield api.moveToWork(data);
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    postOrderResult = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.postOrderResult(data);
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    changeNumProduction = flow(function* (this: OperationStore, data: iData) {
        try {
            yield api.changeNumProduction(data);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
