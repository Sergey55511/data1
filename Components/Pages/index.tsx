import { LayOut } from '../LayOut';
import { pages, tPages } from './constants';
import Leftover from './Leftover';
import { NewItem } from './Moves/MoveIn/NewItem';

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
    }
    return <></>;
};
