import { observer } from 'mobx-react-lite';
import { Title } from '../../Shared/Title';
import { RowWrapper } from './RowWrapper';
import { Wrapper } from './style';
import { iProps, useProps } from './useProps';

export const MakeBall = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <Title
                subbmitHandler={params.subbmitHandler}
                addRowHandler={params.addRowHandler}
                setMoveBack={params.setMoveBack}
                moveBack={params.moveBack}
                setDefect={params.setDefect}
                defect={params.defect}
                losses={params.losses}
                isLoading={params.isLoading}
            />
            <div>
                {params.state.map((item, index) => (
                    <RowWrapper
                        key={index}
                        state={item}
                        index={index}
                        isLoading={params.isLoading}
                        onChange={params.onChange}
                        copyRow={params.copyRow}
                        sizeRange={params.sizeRange}
                        grades={params.grades}
                        removeRow={params.removeRow}
                    />
                ))}
            </div>
        </Wrapper>
    );
});
