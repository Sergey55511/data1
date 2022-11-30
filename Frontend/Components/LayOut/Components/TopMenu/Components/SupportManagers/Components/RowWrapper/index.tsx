import { iManager } from '../../../../../../../../../Shared/Types/interfaces';
import { Row } from './Row';
import { Wrapper } from './style';

export const RowWrapper = ({
    managers,
    isLoading,
}: {
    managers?: iManager[];
    isLoading?: boolean;
}) => {
    return (
        <Wrapper>
            {isLoading ? (
                <div>Загрузка ...</div>
            ) : (
                managers?.map((item) => <Row key={item.id} manager={item} />)
            )}
        </Wrapper>
    );
};
