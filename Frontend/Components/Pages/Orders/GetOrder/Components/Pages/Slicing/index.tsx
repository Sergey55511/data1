import { observer } from 'mobx-react-lite';
import { Row } from './Components/Row';
import { Wrapper } from './style';
import { Title } from '../../Shared/Title';
import { iProps, useProps } from './useProps';
import { Counter } from '../../../../../../Shared/Counter';
import { getCounterDataHandler } from '../../../../../../Helpers';

export const Slicing = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <Title
                subbmitHandler={params.subbmitHandler}
                addRowHandler={params.addRowHandler}
                setMoveBack={params.setMoveBack}
                garbage={params.garbage}
                setGarbage={params.setGarbage}
                defect={params.defect}
                setDefect={params.setDefect}
                moveBack={params.moveBack}
                losses={params.losses}
                isLoading={params.postData?.isLoading}
                date={params.date}
                setDate={params.setDate}
            />
            <Counter data={getCounterDataHandler(params.data)} widthKey="widthIn" />
            <div>
                {params.data.map((item, index) => (
                    <Row
                        index={index}
                        state={item}
                        removeRow={params.removeRow}
                        copyRow={params.copyRow}
                        setState={params.setState}
                        key={index}
                        isShowState={props.isShowState}
                        operationId={params.operationId}
                        onKeyDown={params.onKeyDown}
                        onFocus={params.onFocus}
                        refHandler={params.refHandler}
                    />
                ))}
            </div>
        </Wrapper>
    );
});
