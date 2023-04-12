import { Button } from 'antd';
import { useState } from 'react';
import { SelectField } from '../../../../Shared/SelectField';
import { Wrapper } from './style';

export const HeaderPrintBlank = () => {
    const [production, setProduction] = useState<number>();
    return (
        <Wrapper>
            <div className="container">
                <SelectField
                    placeholder="Номер производства"
                    value={production}
                    onChange={(v) => setProduction(v)}
                    options={[
                        { value: 1, caption: 'some text' },
                        { value: 2, caption: 'some text2' },
                        { value: 3, caption: 'some text3' },
                    ]}
                />
                <Button disabled={!production}>Сформировать</Button>
                <Button type="primary">Распечатать</Button>
            </div>
        </Wrapper>
    );
};
