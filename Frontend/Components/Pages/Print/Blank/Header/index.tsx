import { Button } from 'antd';
import { SelectField } from '../../../../Shared/SelectField';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const HeaderPrintBlank = () => {
    const props = useProps();
    return (
        <Wrapper>
            <div className="container">
                <SelectField
                    placeholder="Номер производства"
                    value={props.production}
                    onChange={(v) => props.setProduction(v)}
                    options={props.options}
                    selectProps={{ loading: props.productionList.isFetching }}
                />
                <Button disabled={!props.production}>Сформировать</Button>
                <Button type="primary">Распечатать</Button>
            </div>
        </Wrapper>
    );
};
