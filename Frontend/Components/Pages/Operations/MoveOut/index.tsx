import { Badge, Button, Input, Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../../Shared/InputField';
import { SelectField } from '../../../Shared/SelectField';
import { Title } from '../../../Shared/Title';
import { Wrapper } from './style';
import { TableLeftOvers } from './TableLeftovers';
import { TableMoveOut } from './TableMoveOut';
import { useProps } from './useProps';

export const MoveOut = observer(
    (props: {
        title: string;
        type?: 'moveOut' | 'shareItems' | 'mixingGrade' | 'mixingSize' | 'mixingLot';
    }) => {
        const params = useProps(props);

        return (
            <Wrapper>
                <div className="header">
                    <Title text={props.title} />
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
                </div>
                <div className="buttonGroup">
                    <Radio.Group
                        value={params.buttonState}
                        onChange={(e) => params.setButtonState(e.target.value)}
                    >
                        <Radio.Button value="lefovers">Остаток</Radio.Button>
                        <Badge count={params.selectedRows.length} size="small">
                            <Radio.Button value="prepare">Подготовка</Radio.Button>
                        </Badge>
                    </Radio.Group>
                    {params.buttonState == 'prepare' && (
                        <Button
                            disabled={params.isDisabled}
                            type="primary"
                            onClick={params.submitData}
                            loading={params.isSubmitLoading}
                        >
                            Провести
                        </Button>
                    )}
                </div>
                <div>
                    {params.buttonState == 'lefovers' && (
                        <TableLeftOvers
                            {...{
                                filters: params.filters,
                                setFilters: params.setFilters,
                                leftovers: params.leftoversData,
                                selectRow: params.selectRow,
                            }}
                        />
                    )}
                    {params.buttonState == 'prepare' && (
                        <TableMoveOut
                            {...{
                                filters: params.filters,
                                setFilters: params.setFilters,
                                leftovers: params.moveOutData,
                                onChange: params.onChange,
                                removeRow: (i: number) =>
                                    params.setSelectedRows((prev) => {
                                        const res = prev.filter((item) => item != i);
                                        return [...res];
                                    }),
                            }}
                        />
                    )}
                </div>
            </Wrapper>
        );
    },
);
