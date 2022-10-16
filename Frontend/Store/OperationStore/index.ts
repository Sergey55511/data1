import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from '../ErrorStore';
import { iError, iData, iDataTable } from '../../../Shared/Types/interfaces';
import { Login } from '../LoginStore';
import { ListsStore } from '../Lists';

export class OperationStore {
    errorStore: ErrorStore;
    loginStore: Login;
    listsStore: ListsStore;
    maxLot = 0;

    constructor(errorStore: ErrorStore, login: Login, listsStore: ListsStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
        this.loginStore = login;
        this.listsStore = listsStore;
    }

    postProductions = flow(function* (this: OperationStore, description: string) {
        const storeId = this.loginStore.user.storeId;
        try {
            yield api.postProductions({ description, storeId });
            yield this.listsStore.getProductions(this.loginStore.user.storeId);
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
        data: iDataTable[],
        callBack?: () => void,
        isSetNewPP?:boolean,
    ) {
        try {
            yield api.moveToWork({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.listsStore.maxId,
                isSetNewPP
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    mixing = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.mixing({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.listsStore.maxId,
            });
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
