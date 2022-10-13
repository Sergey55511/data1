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
export interface iDataTable {
    lot?: number;
    numProduction?: string;
    pp?: number;
    workpieceTypeId?: number;
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
    widthOut?: number;
    widthIn?: number;
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
}
export interface iLength {
    id: number;
    length: string;
}
export interface iRecipient {
    id: number;
    recipient: string;
}
