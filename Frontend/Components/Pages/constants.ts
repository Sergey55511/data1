export type tPages = keyof typeof pages;

export const pages = {
    leftover: 'leftover',
    newItem: 'newItem',
    orders: 'orders',
    getOrder: 'getOrder',
    moveOut: 'moveOut',
    moveOin: 'moveOin',
    shareItems: 'shareItems',
    mixing: 'mixing',
    moveIn: 'moveIn',
    moveInDetales: 'moveInDetales',
};

export const ROUTES = {
    root: '/',
    login: '/login',
    orders: '/orders',
    movein: '/operations/movein',
    newItem: '/newItem',
    moveout: '/operations/moveout',
    shareItems: '/operations/shareItems',
    mixing: '/operations/mixing',
    getOrder: '/orders/getOrder',
};
