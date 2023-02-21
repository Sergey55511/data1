import { pages, tPages } from './constants';
import { GetOrder } from './Orders/GetOrder';
import Leftover from './Leftover';
import Products from './Products';
import { NewItem } from './Operations/MoveIn/NewItem';
import { Orders } from './Orders';
import { MoveOut } from './Operations/MoveOut';
import { MoveIn } from './Operations/MoveIn/SharedStoreItems';
import { MoveInDetales } from './Operations/MoveIn/SharedStoreItems/MoveInDetales';
import { Assemble } from './Assemble';
import { ListOperations } from './ListOperations';
import { NewItemBillets } from './Operations/MoveIn/NewItemBillets';

export const PageSwitcher = ({ page }: { page: tPages }) => {
    switch (page) {
        case pages.newItemBillets:
            return <NewItemBillets />;
        case pages.listOperations:
            return <ListOperations />;
        case pages.products:
            return <Products />;
        case pages.leftover:
            return <Leftover />;
        case pages.newItem:
            return <NewItem />;
        case pages.orders:
            return <Orders />;
        case pages.ordersGetOut:
            return <Orders isGetOut />;
        case pages.getOrder:
            return <GetOrder />;
        case pages.inventory:
            return <MoveOut title="Пересорт:" type="inventory" />;
        case pages.moveOut:
            return <MoveOut title="Отгрузка:" type="moveOut" />;
        case pages.shareItems:
            return <MoveOut title="Перемещение:" type="shareItems" />;
        case pages.mixingGrade:
            return <MoveOut title="Смешивание сорт:" type="mixingGrade" />;
        case pages.mixingSize:
            return <MoveOut title="Смешивание размер:" type="mixingSize" />;
        case pages.mixingLot:
            return <MoveOut title="Смешивание партия:" type="mixingLot" />;
        case pages.mixingProduction:
            return <MoveOut title="Смешивание производство:" type="mixingProduction" />;
        case pages.moveIn:
            return <MoveIn />;
        case pages.moveInDetales:
            return <MoveInDetales />;
        case pages.assemble:
            return <Assemble />;
    }
    return <></>;
};
