import { Input } from 'antd';
import { InputField } from '../../../../Shared/InputField';
import { SelectField } from '../../../../Shared/SelectField';
import { Title } from '../../../../Shared/Title';
import { iProps, useProps } from '../useProps';
import { InputGroup } from './inputGroup';

export const Header = ({
    props,
    params,
}: {
    props: iProps;
    params: ReturnType<typeof useProps>;
}) => {
    return (
        <div className="header">
            <Title text={props.title} />
            {props.type != 'inventory' && (
                <InputGroup
                    {...{
                        props,
                        params,
                    }}
                />
            )}
        </div>
    );
};
