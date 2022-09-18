import { notification } from 'antd';
import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from '../ErrorStore';
import { iError, iLeftovers, iNewItems } from '../interfaces';
import { Login } from '..';

export class OperationStore {
    operations: { opereytion: string }[] = [];
    leftovers: iLeftovers[] = [];
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

    postNewItems = flow(function* (
        this: OperationStore,
        data: iNewItems[],
        callBack: () => void,
    ) {
        try {
            yield api.postNewItems(data);
            yield this.getMaxLot();
            callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
