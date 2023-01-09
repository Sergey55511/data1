import moment from 'moment';

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
    active: boolean;
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

export interface iDataProductTable {
    storeId?: number;
    model?: string;
    userId?: number;
    pp?: number;
    managerId?: number;
    workpieceTypeId?: number;
    colorId?: number;
    length?: number;
    gradeId?: number;
    stateId?: number;
    articleId?: number;
    recipientId?: number;
    operationId?: number;
    numDocument?: String;
    widthIn?: number;
    widthOut?: number;
    moneyIn?: number;
    moneyOut?: number;
    countItemsIn?: number;
    countItemsOut?: number;
}

export interface iDataProduct extends iDataProductTable {
    workpieceType?: string;
    color?: string;
    grade?: string;
    state?: string;
    width: number;
    count: number;
    code: number;
}
export interface iDataTable {
    id?: number;
    lot?: number;
    workingHours?: number;
    numDocument?: string;
    pp?: number;
    articleId?: number;
    workpieceTypeId?: number;
    typeId?: number;
    userId?: number;
    managerId?: number;
    recipientId?: number;
    fullModelId?: number;
    task?: number;
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
    widthInDocument?: number;
    widthIn?: number;
    defect?: number;
    moneyIn?: number;
    moneyOut?: number;
    date?: moment.Moment | null | any;
    model?: string;
}

export interface iData extends iDataTable {
    dateSystem?: moment.Moment;
    key?: number;
    userLogin?: string;
    recipient?: string;
    fullModel?: string;
    managerLogin?: string;
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
export interface iChannel {
    id: number;
    channel: string;
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
export interface iColorAssemble {
    id: number;
    colorAssemble: string;
}
export interface iGradeAssemble {
    id: number;
    gradeAssemble: string;
}
export interface iResultAssemble {
    id: number;
    resultAssemble: string;
}
export interface iTypeAssemble {
    id: number;
    typeAssemble: string;
}
export interface iVariantAssemble {
    id: number;
    variantAssemble: string;
}
export interface iYarnAssemble {
    id: number;
    yarnAssemble: string;
}
export interface iWorkpieceType {
    id: number;
    workpieceType: string;
    nextTypeId?: number;
}
export interface iModel {
    id: number;
    model: string;
}
export interface iProfile {
    id: number;
    profile: string;
}
export interface iLengthModel {
    id: number;
    length: string;
}
export interface iSizeRangeModel {
    id: number;
    sizeRange: string;
}
export interface iFullModel {
    id: number;
    fullModel: string;
    LengthModel: iLengthModel;
    Models: iModel;
    Profile: iProfile;
    SizeRangeModel: iSizeRangeModel;
    WorkpieceType: iWorkpieceType;
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
