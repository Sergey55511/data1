import { flow, makeAutoObservable } from 'mobx';
import {
    iData,
    iError,
    iFraction,
    iManager,
    iMaterialGroup,
    iOperation,
    iProductions,
    iSizeRange,
    iUser,
} from '../../../Shared/Types/interfaces';
import { ErrorStore } from '../ErrorStore';
import * as api from './api';

export class ListsStore {
    errorStore: ErrorStore;
    stores: { id: number; name: string }[] = [];
    users: iUser[] = [];
    managers: iManager[] = [];
    operations: iOperation[] = [];
    productions: iProductions[] = [];
    leftovers: iData[] = [];
    orders: iData[] = [];
    materialGroup: iMaterialGroup[] = [];
    sizeRange: iSizeRange[] = [];
    fraction: iFraction[] = [];

    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }

    getLeftovers = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.leftovers = yield api.leftovers(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getOrders = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.orders = yield api.getOrders(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getOperations = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.operations = yield api.getOperations(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getProductions = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.productions = yield api.getProductions(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getUsers = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.users = yield api.getUsers(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getManagers = flow(function* (
        this: ListsStore,
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
    getMaterialGroup = flow(function* (this: ListsStore) {
        try {
            this.materialGroup = yield api.getMaterialGroup();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getSizeRange = flow(function* (this: ListsStore) {
        try {
            this.sizeRange = yield api.getSizeRange();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getFraction = flow(function* (this: ListsStore) {
        try {
            this.fraction = yield api.getFraction();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getStores = flow(function* (this: ListsStore) {
        try {
            this.stores = yield api.getStores();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
