import { iDataProduct } from '../../../../../../Shared/Types/interfaces';
import { Counter } from '../../../../Shared/Counter';
import { Wrapper } from './style';

export const TotalCounter = ({
    selectedRows,
    filteredleftovers,
}: {
    selectedRows: iDataProduct[];
    filteredleftovers: iDataProduct[];
}) => {
    return (
        <Wrapper>
            <div className="title">Выбрано:</div>
            <div>
                <Counter data={selectedRows} countKey="count" widthKey="width" />
            </div>
            <div className="title">Всего:</div>
            <div>
                <Counter data={filteredleftovers} countKey="count" widthKey="width" />
            </div>
        </Wrapper>
    );
};
