export type tPages = keyof typeof pages;

export const pages = {
    leftover: 'leftover',
    newItem: 'newItem',
    newItemBillets: 'newItemBillets',
    orders: 'orders',
    ordersGetOut: 'ordersGetOut',
    getOrder: 'getOrder',
    moveOut: 'moveOut',
    listOperations: 'listOperations',
    moveInDocuments: 'moveInDocuments',
    shareItems: 'shareItems',
    mixingGrade: 'mixingGrade',
    mixingSize: 'mixingSize',
    mixingLot: 'mixingLot',
    mixingProduction: 'mixingProduction',
    moveIn: 'moveIn',
    moveInDetales: 'moveInDetales',
    assemble: 'assemble',
    assembleBijouterie: 'assembleBijouterie',
    products: 'products',
    bijouterie: 'bijouterie',
    inventory: 'inventory',
};

export const ROUTES = {
    root: '/',
    products: '/products',
    bijouterie: '/bijouterie',
    login: '/login',
    orders: '/orders',
    ordersGetOut: '/orders/getOut',
    movein: '/operations/movein',
    reports: {
        listOperations: '/reports/listOperations',
        moveInDocuments: '/reports/moveInDocuments',
    },
    print: { blank: '/print/blank' },
    newItem: '/newItem',
    newItemBillets: '/newItemBillets',
    moveout: '/operations/moveout',
    shareItems: '/operations/shareItems',
    mixingGrade: '/operations/mixing/grade',
    mixingSize: '/operations/mixing/size',
    mixingLot: '/operations/mixing/lot',
    mixingProduction: '/operations/mixing/production',
    inventory: '/operations/inventory',
    getOrder: '/orders/getOrder',
    assemble: '/assemble',
    assembleBijouterie: '/assemble/bijouterie',
};
