import { iField } from '../../../Shared/Types/interfaces';

export class Field implements iField {
    key;
    placeholder;
    value = '';
    isError = false;
    isReqired = true;
    checkDuplicate = true;
    constructor(
        key: string,
        placeholder: string,
        isReqired = true,
        checkDuplicate = true,
    ) {
        this.key = key;
        this.placeholder = placeholder;
        this.isReqired = isReqired;
        this.checkDuplicate = checkDuplicate;
    }
}
