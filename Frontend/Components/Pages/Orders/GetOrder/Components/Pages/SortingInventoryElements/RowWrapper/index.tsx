import { observer } from 'mobx-react-lite';
import { iProps, useProps } from './useProps';
import { Row } from '../../../../../../../Shared/Row';
import { useFields } from './useFields';

export const RowWrapper = observer((props: iProps) => {
    const params = useProps(props);
    const fields = useFields({ props, params });

    return (
        <Row
            key={props.index}
            isLoading={props.isLoading}
            removeRow={() => props.removeRow(props.index)}
            copyRow={() => props.copyRow(props.index)}
            fields={fields}
        />
    );
});
