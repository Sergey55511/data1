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
    workpieceType: string;
    model?: string;
    sizeRange?: string;
    colorType?: string;
    length?: string;
    channel?: string;
    grade?: string;
    state?: string;
    lot?: string;
    numProduction?: string;
    width: number;
    count?: number;
    code: number;
}
