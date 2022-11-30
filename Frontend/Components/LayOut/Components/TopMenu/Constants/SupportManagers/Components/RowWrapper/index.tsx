import { iManager } from '../../../../../../../../../Shared/Types/interfaces';
import { Row } from './Row';
import { Wrapper } from './style';

export const RowWrapper = ({ managers }: { managers?: iManager[] }) => {
    return (
        <Wrapper>
            {managers?.map((item) => (
                <Row key={item.id} manager={item} />
            ))}
        </Wrapper>
    );
};
