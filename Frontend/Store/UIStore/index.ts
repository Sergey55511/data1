import { flow, makeAutoObservable } from 'mobx';
import { iError } from '../../../Shared/Types/interfaces';
import { ErrorStore } from '../ErrorStore';
import * as api from './api';
export class UIStore {
    version = 0;
    isLoading = false;
    errorStore: ErrorStore;
    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }
    setIsLoading = (flag: boolean) => (this.isLoading = flag);

    getVersion = flow(function* (this: UIStore) {
        if (this.version) return;
        try {
            this.version = yield api.getVersion();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
