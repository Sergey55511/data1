import { observer } from 'mobx-react-lite';
import { InputNumber } from '../../Shared/InputNumber';
import { SelectField } from '../../Shared/SelectField';
import { LockDescription } from './lockDescription';
import { ProductDescription } from './productDescription';
import { Row } from './Row';
import { Wrapper } from './style';
import { useProps } from './useProps';
import { YarnDescription } from './yarnDescription';

export const AssembleBijouterie = observer(() => {
    const {
        bijouterieId,
        setBijouterieId,
        bijouterie,
        selectedBijouterie,
        lock,
        yarnsAssemble,
        countItems,
        setCountItems,
        widthItems,
        setWidthItems,
        bijouterieBridge,
    } = useProps();

    return (
        <Wrapper>
            <div className="header">
                <h3>Сборка бижутерия</h3>
                <SelectField
                    placeholder="Выберите изделие"
                    value={bijouterieId}
                    onChange={setBijouterieId}
                    options={bijouterie.data?.map((item) => ({
                        value: item.id,
                        caption: item.article,
                    }))}
                />
                <div>
                    <InputNumber
                        value={countItems}
                        placeholder="кол-во изделий"
                        onChangeHandler={setCountItems}
                    />
                </div>
                <div>
                    <InputNumber
                        value={widthItems}
                        placeholder="общий вес"
                        onChangeHandler={setWidthItems}
                    />
                </div>
            </div>
            <div className="bodyBijouterie">
                <ProductDescription selectedBijouterie={selectedBijouterie} />
                <LockDescription lock={lock} />
                <YarnDescription yarn={yarnsAssemble} />
            </div>
            <div className="itemsWrapper">
                <h3>Составляющие</h3>
                {bijouterieBridge.data?.map((item) => (
                    <div key={item.id} className="rowWrapper">
                        <div>{item.workpieceType.workpieceType}</div>
                        <div>{item.sizeRange.sizeRange}</div>
                        <div>{item.color.color}</div>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
});
