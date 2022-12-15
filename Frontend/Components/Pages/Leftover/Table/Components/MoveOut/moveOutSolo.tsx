import { Button, DatePicker, Divider, Drawer, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { iProps } from '.';
import { iData } from '../../../../../../../Shared/Types/interfaces';
import { SelectField } from '../../../../../Shared/SelectField';
import { KEYSLEFTOVERS } from '../../../../../Shared/Table/constants';
import { SetTask } from '../SetTask';
import { Wrapper } from './style';
import { tConstKeys, useProps } from './useProps';

export const MoveOutSolo = observer(
    ({
        record,
        onClose,
        isShowCount,
        isShowTask,
    }: iProps) => {
        const props = useProps(record, onClose);

        return (
            <Drawer open title="Выдать в работу" width={600} onClose={onClose}>
                <Wrapper>
                    {props.isShowSetTask && (
                        <SetTask
                            onClose={() => props.setIsShowSetTask(false)}
                            record={record}
                            operationId={props.operation}
                            setTask={props.setTask}
                        />
                    )}
                    <div className="formWrapper">
                        <DatePicker
                            placeholder="Дата операции"
                            style={{ width: '100%' }}
                            value={props.date}
                            onChange={(v) => props.setDate(v)}
                            allowClear
                            onKeyDown={props.onPressEnterHandler}
                        />
                        <SelectField
                            placeholder="Операция"
                            value={props.operation}
                            onChange={(v) => props.setOperation(v)}
                            options={props.operations?.map((item) => ({
                                value: item.id,
                                caption: item.operation,
                            }))}
                        />
                        <SelectField
                            placeholder="Исполнитель"
                            value={props.managerId}
                            onChange={(v) => props.setManagerId(v)}
                            options={props.managers?.map((item) => ({
                                value: item.id,
                                caption: item.name,
                            }))}
                        />
                        <div className="flex">
                            <div className="item">
                                <h3>{KEYSLEFTOVERS.width.title}</h3>
                                <p>{record.width}</p>
                            </div>
                            {isShowCount && (
                                <div className="item">
                                    <h3>{KEYSLEFTOVERS.count.title}</h3>
                                    <p>{record.count}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex">
                            <div className="item">
                                <div>
                                    <Input
                                        placeholder="Выдать"
                                        disabled={!record.width}
                                        value={props.width}
                                        onChange={(e) =>
                                            props.setValue(e.target.value, props.setWidth)
                                        }
                                        onKeyDown={props.onPressEnterHandler}
                                    />
                                </div>
                            </div>
                            {isShowCount && (
                                <div className="item">
                                    <div>
                                        <Input
                                            placeholder="Выдать"
                                            disabled={!record.count}
                                            value={props.count}
                                            onChange={(e) =>
                                                props.setValue(
                                                    e.target.value,
                                                    props.setCount,
                                                )
                                            }
                                            onKeyDown={props.onPressEnterHandler}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="selectButtons">
                                <div>№ производства {record.productionId}</div>
                                <Button
                                    type="link"
                                    onClick={props.setNumProduction}
                                    disabled={!!record.productionId}
                                >
                                    {props.numProd
                                        ? `№ производства ${props.numProd}`
                                        : 'Выбрать номер производства'}
                                </Button>
                            </div>
                            {isShowTask && (
                                <div className="selectButtons">
                                    <div>Задание {props.task.task}</div>
                                    <Button
                                        type="link"
                                        onClick={props.setTaskIsShowTask}
                                        disabled={!props.operation}
                                    >
                                        Назначить задание
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div>
                            <Button
                                type="primary"
                                disabled={!props.isValid}
                                onClick={props.subbmitHandler}
                                loading={props.isLoading}
                                ref={props.subbmitButton}
                            >
                                Выдать
                            </Button>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex">
                        {props.keys
                            .filter((key) => {
                                const field = KEYSLEFTOVERS[key as tConstKeys]?.key;
                                if (
                                    [
                                        KEYSLEFTOVERS.width.key,
                                        KEYSLEFTOVERS.count.key,
                                        KEYSLEFTOVERS.numProduction.key,
                                    ].includes(field)
                                )
                                    return false;
                                return KEYSLEFTOVERS[key as tConstKeys]?.title;
                            })
                            .map((key) => {
                                return (
                                    <div key={key} className="item">
                                        <h3>{KEYSLEFTOVERS[key as tConstKeys].title}</h3>
                                        <p>{record[key as keyof iData] as string}</p>
                                    </div>
                                );
                            })}
                    </div>
                </Wrapper>
            </Drawer>
        );
    },
);
