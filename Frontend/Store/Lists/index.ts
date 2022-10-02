import { flow, makeAutoObservable } from 'mobx';
import { iError, iFraction, iMaterialGroup, iSizeRange } from '../../../Shared/Types/interfaces';
import * as api from './api';

export class ListsStore {
    materialGroup: iMaterialGroup[] = [];
    sizeRange: iSizeRange[] = [];
    fraction: iFraction[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    getMaterialGroup = flow(function* (this: ListsStore) {
        this.materialGroup = yield api.getMaterialGroup();
    });
    getSizeRange = flow(function* (this: ListsStore) {
        this.sizeRange = yield api.getSizeRange();
    });
    getFraction = flow(function* (this: ListsStore) {
        this.fraction = yield api.getFraction();
    });
}
