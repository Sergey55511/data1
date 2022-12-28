import { LayOut } from '../LayOut';
import { tPages } from './constants';
import { PageSwitcher } from './pageSwitcher';

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