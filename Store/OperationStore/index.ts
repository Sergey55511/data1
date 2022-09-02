import { notification } from 'antd';
import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from '../ErrorStore';
import { iError, iLeftovers, iLogin, iUser } from '../interfaces';

export class OperationStore {
    operations: { opereytion: string }[] = [];
    leftovers: iLeftovers[] = [];
    errorStore: ErrorStore;
    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }

    getOperations = flow(function* (this: OperationStore, storeId: number) {
        try {
            this.operations = yield api.getOperations(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getLeftovers = flow(function* (this: OperationStore) {
        try {
            this.leftovers = yield api.leftovers();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
