export interface iLogin {
    login: string;
    password: string;
}

export interface iUser {
    id: number;
    login: string;
    password?: string;
    key: string;
    status: string;
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
