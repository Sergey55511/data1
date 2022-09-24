import { makeAutoObservable } from 'mobx';

export class UIStore {
    isLoading = false;
    constructor() {
        makeAutoObservable(this);
    }
    setIsLoading = (flag: boolean) => (this.isLoading = flag);
}
