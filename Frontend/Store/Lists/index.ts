import { flow, makeAutoObservable } from 'mobx';
import {
    iColor,
    iError,
    iFraction,
    iGrade,
    iLength,
    iManager,
    iMaterialGroup,
    iOperation,
    iProductions,
    iQueryFilters,
    iRecipient,
    iSizeRange,
    iType,
    iUser,
    iWorkpieceType,
} from '../../../Shared/Types/interfaces';
import { ErrorStore } from '../ErrorStore';
import { Login } from '../LoginStore';
import * as api from './api';

export class ListsStore {
    errorStore: ErrorStore;
    loginStore: Login;
    stores: { id: number; name: string }[] = [];
    users: iUser[] = [];
    managers: iManager[] = [];
    types: iType[] = [];
    colors: iColor[] = [];

    operations: iOperation[] = [];
    productions: iProductions[] = [];
    materialGroup: iMaterialGroup[] = [];
    fraction: iFraction[] = [];
    workpieceType: iWorkpieceType[] = [];
    recipient: iRecipient[] = [];

    constructor(errorStore: ErrorStore, loginStore: Login) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
        this.loginStore = loginStore;
    }

    getOperations = flow(function* (this: ListsStore, storeId: number, stateId: number) {
        try {
            this.operations = yield api.getOperations(storeId, stateId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getGrades = flow(function* (this: ListsStore, filters: iQueryFilters) {
        try {
            return yield api.getGrades(filters);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getTypes = flow(function* (this: ListsStore, filters: iQueryFilters) {
        try {
            this.types = yield api.getTypes(filters);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getColors = flow(function* (this: ListsStore, filters: iQueryFilters) {
        try {
            this.colors = yield api.getColors(filters);
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
        params: {
            storeId: number;
            operationId?: number;
            search?: string;
            active?: boolean;
        },
    ) {
        try {
            this.managers = yield api.getManagers(params);
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
    getSizeRange = flow(function* (
        this: ListsStore,
        filters: iQueryFilters,
        id?: number,
    ) {
        try {
            return yield api.getSizeRange(filters, id);
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
    getWorkpieceType = flow(function* (this: ListsStore, filters: iQueryFilters) {
        try {
            this.workpieceType = yield api.getWorkpieceType(filters);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getLength = flow(function* (this: ListsStore, filters: iQueryFilters) {
        try {
            return yield api.getLength(filters);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getRecipient = flow(function* (this: ListsStore, storeId?: number) {
        try {
            this.recipient = yield api.getRecipient(storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    postRecipient = flow(function* (this: ListsStore, data: { recipient: string }[]) {
        try {
            yield api.postRecipient(data);
            yield this.getRecipient();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
