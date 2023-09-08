import { getHTMLTicket, iTocketProps } from './ticket';

export const printTicket = (data: iTocketProps) => {
    const w = window.open();
    w?.document.write(getHTMLTicket(data));
    w?.window.print();
    w?.window.close();
};
