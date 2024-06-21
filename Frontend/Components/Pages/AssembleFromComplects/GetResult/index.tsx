import { eTypeButton } from '../useProps';
import { Form } from './Form';
import { iProps } from './Form/useProps';
import { MinaretMoveOut } from './MinaretMoveOut';

export const GetResult = (props: iProps) => {
    if (props.stateButton != eTypeButton.getResult) return null;
    return (
        <>
            <Form {...props} />
            <MinaretMoveOut data={props.minarets} setMinaret={props.setMinaret} />
        </>
    );
};
