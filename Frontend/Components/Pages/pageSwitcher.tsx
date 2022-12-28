import { pages, tPages } from './constants';
import { GetOrder } from './Orders/GetOrder';
import Leftover from './Leftover';
import { NewItem } from './Operations/MoveIn/NewItem';
import { Orders } from './Orders';
import { MoveOut } from './Operations/MoveOut';
import { MoveIn } from './Operations/MoveIn/SharedStoreItems';
import { MoveInDetales } from './Operations/MoveIn/SharedStoreItems/MoveInDetales';
import { AssembleCreate } from './Assemble/Create';
import { Assemble } from './Assemble';

export const PageSwitcher = ({ page }: { page: tPages }) => {
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
        case pages.mixingGrade:
            return <MoveOut title="Смешивание сорт:" type="mixingGrade" />;
        case pages.mixingSize:
            return <MoveOut title="Смешивание размер:" type="mixingSize" />;
        case pages.mixingLot:
            return <MoveOut title="Смешивание партия:" type="mixingLot" />;
        case pages.moveIn:
            return <MoveIn />;
        case pages.moveInDetales:
            return <MoveInDetales />;
        case pages.assembleCreate:
            return <Assemble state="assembleCreate" />;
    }
    return <></>;
};
