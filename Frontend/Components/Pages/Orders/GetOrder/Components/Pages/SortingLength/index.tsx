import { observer } from 'mobx-react-lite';
import { RowWrapper } from './RowWrapper';
import { Wrapper } from './style';
import { Title } from '../../Shared/Title';
import { iProps, useProps } from './useProps';

export const SortingLength = observer((props: iProps) => {
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
            />
            <div>
                {params.state.map((item, index) => (
                    <RowWrapper
                        index={index}
                        state={item}
                        removeRow={params.removeRow}
                        copyRow={params.copyRow}
                        setState={params.setState}
                        isLoading={params.isLoading}
                        record={params.record}
                        key={index}
                    />
                ))}
            </div>
        </Wrapper>
    );
});
