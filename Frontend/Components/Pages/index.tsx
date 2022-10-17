import { LayOut } from '../LayOut';
import { pages, tPages } from './constants';
import { GetOrder } from './Orders/GetOrder';
import Leftover from './Leftover';
import { NewItem } from './Moves/MoveIn/NewItem';
import { Orders } from './Orders';
import { MoveOut } from './Operations/MoveOut';
import { MoveIn } from './Operations/MoveIn';
import { MoveInDetales } from './Operations/MoveIn/MoveInDetales';

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
        case pages.moveOut:
            return <MoveOut title="Отгрузка:" type="moveOut" />;
        case pages.shareItems:
            return <MoveOut title="Перемещение:" type="shareItems" />;
        case pages.mixing:
            return <MoveOut title="Смешивание:" type="mixing" />;
        case pages.moveIn:
            return <MoveIn />;
        case pages.moveInDetales:
            return <MoveInDetales />;
    }
    return <></>;
};
