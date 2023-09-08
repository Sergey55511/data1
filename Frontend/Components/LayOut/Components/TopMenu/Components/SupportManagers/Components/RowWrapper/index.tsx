import { iManager } from '../../../../../../../../../Shared/Types/interfaces';
import { Row } from './Row';
import { Wrapper } from './style';

export const RowWrapper = ({
    managers,
    isLoading,
    fetchManagers,
}: {
    managers?: iManager[];
    isLoading?: boolean;
    fetchManagers: () => void;
}) => {
    return (
        <Wrapper>
            {isLoading ? (
                <div>Загрузка ...</div>
            ) : (
                managers?.map((item) => (
                    <Row key={item.id} manager={item} fetchManagers={fetchManagers} />
                ))
            )}
        </Wrapper>
    );
};
