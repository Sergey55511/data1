import { Button } from 'antd';
import { SetStateAction } from 'react';
import { SelectField } from '../../../../Shared/SelectField';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const HeaderPrintBlank = ({
    production,
    setProduction,
}: {
    production?: number;
    setProduction: (value: SetStateAction<number | undefined>) => void;
}) => {
    const props = useProps();
    return (
        <Wrapper>
            <div className="container">
                <SelectField
                    placeholder="Номер производства"
                    value={production}
                    onChange={setProduction}
                    options={props.options}
                    selectProps={{ loading: props.productionList.isFetching }}
                />
                <Button
                    disabled={!production}
                    type="primary"
                    onClick={() => window.print()}
                >
                    Распечатать
                </Button>
            </div>
        </Wrapper>
    );
};
