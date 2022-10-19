import { flow, makeAutoObservable } from 'mobx';
import {
    iColor,
    iData,
    iDataTable,
    iError,
    iFraction,
    iGrade,
    iLength,
    iManager,
    iMaterialGroup,
    iOperation,
    iProductions,
    iRecipient,
    iShared,
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

    grades: iGrade[] = [];
    types: iType[] = [];
    colors: iColor[] = [];

    operations: iOperation[] = [];
    productions: iProductions[] = [];
    materialGroup: iMaterialGroup[] = [];
    sizeRange: iSizeRange[] = [];
    fraction: iFraction[] = [];
    workpieceType: iWorkpieceType[] = [];
    lengthes: iLength[] = [];
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
    getWorkpieceType = flow(function* (this: ListsStore) {
        try {
            this.workpieceType = yield api.getWorkpieceType();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getLength = flow(function* (this: ListsStore) {
        try {
            this.lengthes = yield api.getLength();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    getLengthBySize = flow(function* (this: ListsStore, sizeRangeId: number) {
        try {
            return yield api.getLengthBySize(sizeRangeId);
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
