import { Button } from 'antd';
import { iProps, useProps } from './useProps';

export const FullReturn = (props: iProps) => {
    const { onClickHandler, returnHandler } = useProps(props);
    return (
        <Button
            loading={returnHandler.isLoading}
            type="primary"
            onClick={onClickHandler}
            style={{ marginRight: '16px' }}
        >
            100 возврат
        </Button>
    );
};
