import { eTypeButton } from '../useProps';
import { ComplectItems } from './ComplectItems';
import { Form } from './Form';
import { iProps } from './Form/UseProps';
import { NewItemsMoveOut } from './NewItemsMoveOut';

export const GetResult = (props: iProps) => {
    if (props.stateButton != eTypeButton.getResult) return null;

    return (
        <>
            <Form {...props} />
            <NewItemsMoveOut data={props.selectedRows} setMinaret={props.setMinaret} />
            <ComplectItems />
        </>
    );
};
