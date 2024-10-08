import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from '../ErrorStore';
import {
    iError,
    iData,
    iDataTable,
    iShared,
    iAssembleTakeApartData,
    iProductions,
} from '../../../Shared/Types/interfaces';
import { Login } from '../LoginStore';
import { ListsStore } from '../Lists';

export class OperationStore {
    isFetched = false;
    errorStore: ErrorStore;
    loginStore: Login;
    listsStore: ListsStore;
    maxLot = 0;
    maxId = 0;
    maxIdSocket = 0;
    shared: iShared[] = [];
    leftovers: iData[] = [];
    orders: iData[] = [];
    ordersGetOut: iData[] = [];
    isLoadingLeftovers = false;

    constructor(errorStore: ErrorStore, login: Login, listsStore: ListsStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
        this.loginStore = login;
        this.listsStore = listsStore;
    }

    get isSynchronousData() {
        return this.maxId == this.maxIdSocket;
    }

    setMaxIdSocket = (maxId: number) => {
        this.maxIdSocket = maxId;
    };

    fetchInitData = flow(function* (this: OperationStore, storeId: number) {
        if (this.isFetched) return;
        try {
            yield this.getShared(storeId, false);
            yield this.getOrders(storeId, false);
            yield this.getOrdersGetOut(storeId);
            yield this.listsStore.getProductions(storeId);
            yield this.listsStore.getUsers(storeId);
            yield this.listsStore.getMaterialGroup();
            yield this.listsStore.getFraction();
            yield this.listsStore.getStores();
            this.isFetched = true;
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    assembleTakeApart = flow(function* (
        this: OperationStore,
        data: iAssembleTakeApartData,
    ) {
        try {
            yield api.assembleTakeApart(data);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getLeftovers = flow(function* (
        this: OperationStore,
        storeId: number,
        isGetMaxId = true,
    ) {
        try {
            this.isLoadingLeftovers = true;
            this.leftovers = yield api.leftovers(storeId);
            if (isGetMaxId) yield this.getMaxId();
            this.isLoadingLeftovers = false;
        } catch (err) {
            this.errorStore.setError(err as iError);
            this.isLoadingLeftovers = false;
        }
    });
    getOrders = flow(function* (
        this: OperationStore,
        storeId: number,
        isGetMaxId = true,
    ) {
        try {
            this.orders = yield api.getOrders(storeId);
            if (isGetMaxId) yield this.getMaxId();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getOrdersGetOut = flow(function* (
        this: OperationStore,
        storeId: number,
        isGetMaxId = true,
    ) {
        try {
            this.ordersGetOut = yield api.getOrdersGetOut(storeId);
            if (isGetMaxId) yield this.getMaxId();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getMaxId = flow(function* (this: OperationStore) {
        this.maxId = yield api.getMaxId(this.loginStore.user.storeId);
        this.setMaxIdSocket(this.maxId);
    });

    postMoveInShared = flow(function* (this: OperationStore, data: iDataTable[]) {
        try {
            return yield api.postMoveInShared(data);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getMoveIn = flow(function* (
        this: OperationStore,
        storeId: number,
        numDocument: string,
    ) {
        try {
            if (storeId) return yield api.getMoveIn(storeId, numDocument);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    getShared = flow(function* (
        this: OperationStore,
        storeId: number,
        isGetMaxId = true,
    ) {
        try {
            this.shared = yield api.getShared(storeId);
            if (isGetMaxId) this.getMaxId();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    postProductions = flow(function* (this: OperationStore, description: string) {
        const storeId = this.loginStore.user.storeId;
        try {
            yield api.postProductions({ description, storeId });
            yield this.listsStore.getProductions(this.loginStore.user.storeId);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    patchProductions = flow(function* (this: OperationStore, production: iProductions) {
        try {
            yield api.patchProductions(production);
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
        isSetNewPP?: boolean,
    ) {
        try {
            yield api.moveToWork({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
                isSetNewPP,
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    mixingGrade = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.mixingGrade({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    mixingProduction = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.mixingProduction({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
    mixingLot = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.mixingLot({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    mixingSize = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.mixingSize({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    mixingState = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.mixingState({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
            });
            if (callBack) callBack();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    inventory = flow(function* (
        this: OperationStore,
        data: iDataTable[],
        callBack?: () => void,
    ) {
        try {
            yield api.inventory({
                data: data,
                storeId: this.loginStore.user.storeId,
                maxId: this.maxId,
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
