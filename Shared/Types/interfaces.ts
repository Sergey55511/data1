export interface iUser {
    id?: number;
    login: string;
    password?: string;
    key?: string;
    status?: string;
    storeId?: string;
    store?: string;
}
export interface iManager {
    id: number;
    name: string;
}
export interface iState {
    id: number;
    state: string;
}

export interface iCookies {
    [key: string]: string;
    atkn: string;
    rtkn: string;
}
export interface iError {
    response: {
        status: number;
        data: { message: string };
    };
}
export interface iShared {
    date: string;
    login: string;
    store: string;
    numDocument: string;
    countRows: number;
}
export interface iDataTable {
    id?: number;
    lot?: number;
    numProduction?: string;
    numDocument?: string;
    pp?: number;
    workpieceTypeId?: number;
    typeId?: number;
    userId?: number;
    managerId?: number;
    recipientId?: number;
    modelId?: number;
    sizeRangeId?: number;
    fractionId?: number;
    materialGroupId?: number;
    colorId?: number;
    lengthId?: number;
    channelId?: number;
    gradeId?: number;
    stateId?: number;
    storeId?: number;
    productionId?: number;
    operationId?: number;
    countItemsOut?: number;
    countItemsIn?: number;
    widthOut?: number;
    widthIn?: number;
    moneyIn?: number;
    moneyOut?: number;
    date?: moment.Moment | null | any;
}

export interface iData extends iDataTable {
    userLogin?: string;
    recipient?: string;
    managerLogin?: string;
    model?: string;
    sizeRange?: string;
    materialGroup?: string;
    color?: string;
    length?: string;
    channel?: number;
    grade?: string;
    state?: string;
    workpieceType?: string;
    width?: number;
    count?: number;
    code?: number;
}

interface iList {
    id: number;
    active: boolean;
    position: number;
}
export interface iMaterialGroup extends iList {
    materialGroup: string;
}
export interface iSizeRange extends iList {
    sizeRange: string;
    size: number;
    nextSizeRangeId?: number;
}
export interface iFraction extends iList {
    fraction: string;
}

export interface iNewItems {
    grade: number;
    lot: number;
    numDocument: string;
    sizeRange: number;
    widthIn: number;
    widthInDocument: number;
}
export interface iOperation {
    id: number;
    operation: string;
}
export interface iProductions {
    id: number;
    description: string;
}
export interface iGrade {
    id: number;
    grade: string;
}
export interface iType {
    id: number;
    type: string;
}
export interface iColor {
    id: number;
    color: string;
}
export interface iWorkpieceType {
    id: number;
    workpieceType: string;
    nextTypeId?: number;
}
export interface iLength {
    id: number;
    length: string;
}
export interface iRecipient {
    id: number;
    recipient: string;
}
export interface iQueryFilters {
    storeId?: number;
    operationId?: number;
    workpieceTypeId?: number;
    typeId?: number;
    gradeId?: number;
    sizeRangeId?: number;
    lengthId?: number;
    colorId?: number;
}

export interface iField {
    key: string;
    placeholder: string;
    value: string | number;
    isError: boolean;
    isReqired: boolean;
}
