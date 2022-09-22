export interface iLogin {
    login: string;
    password: string;
    status?: string;
    store?: number;
}

export interface iUser {
    id: number;
    login: string;
    password?: string;
    key: string;
    status: string;
    storeId?: string;
    store?: string;
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
export interface iLeftovers {
    workpieceTypeId: number;
    workpieceType?: string;
    modelId?: number;
    model?: string;
    sizeRangeId?: number;
    sizeRange?: string;
    materialGroupId?: number;
    materialGroup?: string;
    colorId?: number;
    color?: string;
    lengthId: number;
    length?: string;
    channelId?: number;
    channel?: number;
    gradeId?: number;
    grade?: string;
    stateId?: number;
    state?: string;
    lot?: number;
    numProduction?: string;
    width?: number;
    count?: number;
    productionId?: number;
    code?: number;
    date?: moment.Moment | null;
    countItemsOut?: number;
    widthOut?: number;
    operationId?: number;
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
    opereytion: string;
}
export interface iProductions {
    id: number;
    description: string;
}
