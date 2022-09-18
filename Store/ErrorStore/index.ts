import { flow, makeAutoObservable } from 'mobx';
import { iError } from '../interfaces';

const defaultError = { isError: false, status: 200, message: '' };

export class ErrorStore {
    error = defaultError;
    constructor() {
        makeAutoObservable(this);
    }
    setError = (error: iError) => {
        this.error.isError = true;
        this.error.status = error.response?.status;
        this.error.message = error.response?.data?.message;
    };
    resetError = () => {
        this.error = defaultError;
    };
}
