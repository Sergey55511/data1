import { iField } from '../../../Shared/Types/interfaces';

export class Field implements iField {
    key;
    placeholder;
    value = '';
    isError = false;
    isReqired = true;
    constructor(key: string, placeholder: string, isReqired = true) {
        this.key = key;
        this.placeholder = placeholder;
        this.isReqired = isReqired;
    }
}
