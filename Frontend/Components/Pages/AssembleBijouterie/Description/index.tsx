import { LockDescription } from '../lockDescription';
import { ProductDescription } from '../productDescription';
import { useProps, iProps } from './useProps';
import { YarnDescription } from '../yarnDescription';
import { Wrapper } from './style';

export const Description = (props: iProps) => {
    const { selectedBijouterie, yarnsAssemble } = useProps(props);
    return (
        <Wrapper>
            {props.bijouterieId == undefined ? (
                <></>
            ) : (
                <>
                    <ProductDescription selectedBijouterie={selectedBijouterie} />
                    <LockDescription lock={props.lock} />
                    <YarnDescription yarn={yarnsAssemble} />
                </>
            )}
        </Wrapper>
    );
};
