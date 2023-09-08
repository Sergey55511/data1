import { observer } from 'mobx-react-lite';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { RowWrapper } from './RowWrapper';
import { Wrapper } from './style';
import { Title } from '../../Shared/Title';
import { useProps } from './useProps';
import { Counter } from '../../../../../../Shared/Counter';
import { getCounterDataHandler } from '../../../../../../Helpers';

export const SortingElements = observer((props: { record: iData; stateId: number }) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <Title
                subbmitHandler={params.subbmitHandler}
                addRowHandler={params.addRowHandler}
                setMoveBack={params.setMoveBack}
                moveBack={params.moveBack}
                losses={params.losses}
                isLoading={params.isLoading}
                date={params.date}
                setDate={params.setDate}
                workingTimeFact={params.workingTimeFact}
                setWorkingTimeFact={params.setWorkingTimeFact}
                record={props.record}
            />
            <Counter data={getCounterDataHandler(params.state)} widthKey="widthIn" />
            <div>
                {params.state.map((item, index) => (
                    <RowWrapper
                        index={index}
                        state={item}
                        removeRow={params.removeRow}
                        copyRow={params.copyRow}
                        setState={params.setState}
                        isLoading={params.isLoading}
                        record={props.record}
                        key={index}
                    />
                ))}
            </div>
        </Wrapper>
    );
});
