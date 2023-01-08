export type tPages = keyof typeof pages;

export const pages = {
    leftover: 'leftover',
    newItem: 'newItem',
    orders: 'orders',
    getOrder: 'getOrder',
    moveOut: 'moveOut',
    moveOin: 'moveOin',
    shareItems: 'shareItems',
    mixingGrade: 'mixingGrade',
    mixingSize: 'mixingSize',
    mixingLot: 'mixingLot',
    moveIn: 'moveIn',
    moveInDetales: 'moveInDetales',
    assemble: 'assemble',
    products: 'products',
};

export const ROUTES = {
    root: '/',
    products: '/products',
    login: '/login',
    orders: '/orders',
    movein: '/operations/movein',
    newItem: '/newItem',
    moveout: '/operations/moveout',
    shareItems: '/operations/shareItems',
    mixingGrade: '/operations/mixing/grade',
    mixingSize: '/operations/mixing/size',
    mixingLot: '/operations/mixing/lot',
    getOrder: '/orders/getOrder',
    assemble: '/assemble',
};
