import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { NumProduction } from './NumProduction';
import { SetTask } from './SetTask';
import { Task, useProps } from '../useProps';

export const Drawers = ({
    record,
    props,
}: {
    record: iData;
    props: ReturnType<typeof useProps>;
}) => {
    return (
        <>
            {props.isShowSetTask && (
                <SetTask
                    onClose={() => props.setIsShowSetTask(false)}
                    record={record}
                    operationId={props.operation}
                    setTask={props.setTask}
                    productionId={record.operationId || props.numProd}
                />
            )}
            {props.isNumProduction && (
                <NumProduction
                    setValue={(v: number) => {
                        props.setTask(new Task());
                        props.isNewProductionId.current = true;
                        props.setNumProd(v);
                    }}
                    onClose={() => props.setIsNumProduction(false)}
                />
            )}
        </>
    );
};
