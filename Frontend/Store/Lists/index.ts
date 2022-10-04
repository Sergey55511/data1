import { flow, makeAutoObservable } from 'mobx';
import {
    iColor,
    iData,
    iError,
    iFraction,
    iGrade,
    iManager,
    iMaterialGroup,
    iOperation,
    iProductions,
    iSizeRange,
    iType,
    iUser,
} from '../../../Shared/Types/interfaces';
import { ErrorStore } from '../ErrorStore';
import * as api from './api';

export class ListsStore {
    errorStore: ErrorStore;
    stores: { id: number; name: string }[] = [];
    users: iUser[] = [];
    managers: iManager[] = [];

    grades: iGrade[] = [];
    types: iType[] = [];
    colors: iColor[] = [];

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

    fetchLists = flow(function* (this: ListsStore, storeId: number) {
        try {
            yield this.getGrades(storeId);
            yield this.getTypes(storeId);
            yield this.getColors(storeId);
            yield this.getOperations(storeId);
            yield this.getProductions(storeId);
            yield this.getUsers(storeId);
            yield this.getMaterialGroup();
            yield this.getSizeRange();
            yield this.getFraction();
            yield this.getStores();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

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

    getGrades = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.grades = yield api.getGrades(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getTypes = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.types = yield api.getTypes(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getColors = flow(function* (this: ListsStore, storeId: number) {
        try {
            this.colors = yield api.getColors(storeId);
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
