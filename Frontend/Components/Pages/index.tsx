import { LayOut } from '../LayOut';
import { pages, tPages } from './constants';
import { GetOrder } from './Orders/GetOrder';
import Leftover from './Leftover';
import { NewItem } from './Moves/MoveIn/NewItem';
import { Orders } from './Orders';

interface iProps {
    page: tPages;
}
export const PageReduser = ({ page }: iProps) => {
    return (
        <LayOut page={page}>
            <PageSwitcher page={page} />
        </LayOut>
    );
};

const PageSwitcher = ({ page }: { page: tPages }) => {
    switch (page) {
        case pages.leftover:
            return <Leftover />;
        case pages.newItem:
            return <NewItem />;
        case pages.orders:
            return <Orders />;
        case pages.getOrder:
            return <GetOrder />;
    }
    
    return <></>;
};
