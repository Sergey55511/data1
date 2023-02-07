import { Input } from 'antd';
import { InputField } from '../../../../Shared/InputField';
import { SelectField } from '../../../../Shared/SelectField';
import { iProps, useProps } from '../useProps';

export const InputGroup = ({
    props,
    params,
}: {
    props: iProps;
    params: ReturnType<typeof useProps>;
}) => {
    return (
        <>
            {!params.isMixing && (
                <div className="recipientWrapper">
                    <InputField isError={false}>
                        <SelectField
                            placeholder="получатель"
                            value={params.recipient}
                            onChange={(v) => params.setRecipient(v)}
                            selectProps={{
                                loading: params.isRecipientLoading,
                                disabled: params.isRecipientLoading,
                            }}
                            options={params.recipientList.map((item) => ({
                                value: item.id,
                                caption: item.recipient,
                            }))}
                        />
                    </InputField>
                </div>
            )}
            {props.type == 'moveOut' && (
                <div className="addRecipient">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            params.addRecipient();
                        }}
                    >
                        Добавить получателя
                    </a>
                </div>
            )}
            {!params.isMixing && (
                <div className="numShipment">
                    <Input
                        value={params.numDocument}
                        onChange={(e) => params.setNumDocument(e.target.value)}
                        placeholder="Номер документа"
                    />
                </div>
            )}
        </>
    );
};
