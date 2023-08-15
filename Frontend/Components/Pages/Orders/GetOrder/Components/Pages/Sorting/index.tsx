import { observer } from 'mobx-react-lite';
import { getCounterDataHandler } from '../../../../../../Helpers';
import { Counter } from '../../../../../../Shared/Counter';
import { Title } from '../../Shared/Title';
import { RowWrapper } from './Components/Row';
import { Wrapper } from './style';
import { iProps, useProps } from './useProps';

export const Sorting = observer((props: iProps) => {
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
                record={props.record}
            />
            <Counter data={getCounterDataHandler(params.state)} widthKey="widthIn" />
            <div>
                {params.state.map((item, index) => {
                    return (
                        <RowWrapper
                            key={index}
                            grade={params.grade}
                            index={index}
                            state={item}
                            setState={params.setState}
                            isLoading={params.isLoading}
                            removeRow={params.removeRow}
                            copyRow={params.copyRow}
                            arrowHandler={params.arrowHandler}
                        />
                    );
                })}
            </div>
        </Wrapper>
    );
});
