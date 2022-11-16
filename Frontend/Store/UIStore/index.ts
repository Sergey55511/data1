import { makeAutoObservable } from 'mobx';
import { ErrorStore } from '../ErrorStore';

export class UIStore {
    version = process.env.APP_VERSION || 0;
    isLoading = false;
    errorStore: ErrorStore;
    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }
    setIsLoading = (flag: boolean) => (this.isLoading = flag);
}
