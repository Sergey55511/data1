import { observer } from 'mobx-react-lite';
import { Row } from '../../../../../../../../Shared/Row';
import { iProps, useProps } from './useProps';

export const RowWrapper = observer((props: iProps) => {
    const { fields, width } = useProps(props);

    return (
        <Row
            key={props.index}
            isLoading={props.isLoading}
            removeRow={() => props.removeRow(props.index)}
            copyRow={() => props.copyRow(props.index)}
            isDuplicate={props.state.duplicate}
            fields={fields}
            width={width}
        />
    );
});
