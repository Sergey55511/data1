export type tPages = keyof typeof pages;

export const pages = {
    leftover: 'leftover',
    newItem: 'newItem',
    orders: 'orders',
    ordersGetOut: 'ordersGetOut',
    getOrder: 'getOrder',
    moveOut: 'moveOut',
    moveOin: 'moveOin',
    shareItems: 'shareItems',
    mixingGrade: 'mixingGrade',
    mixingSize: 'mixingSize',
    mixingLot: 'mixingLot',
    mixingProduction: 'mixingProduction',
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
    ordersGetOut: '/orders/getOut',
    movein: '/operations/movein',
    newItem: '/newItem',
    moveout: '/operations/moveout',
    shareItems: '/operations/shareItems',
    mixingGrade: '/operations/mixing/grade',
    mixingSize: '/operations/mixing/size',
    mixingLot: '/operations/mixing/lot',
    mixingProduction: '/operations/mixing/production',
    getOrder: '/orders/getOrder',
    assemble: '/assemble',
};
