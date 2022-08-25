import { notification } from 'antd';
import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from '../ErrorStore';
import { iError, iLogin, iUser } from '../interfaces';

export class OperationStore {
    operations: { opereytion: string }[] = [];
    errorStore: ErrorStore;
    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }

    getOperations = flow(function* (this: OperationStore) {
        try {
            this.operations = yield api.getOperations();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
