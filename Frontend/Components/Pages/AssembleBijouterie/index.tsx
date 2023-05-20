import { observer } from 'mobx-react-lite';
import { SelectField } from '../../Shared/SelectField';
import { Row } from './Row';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const AssembleBijouterie = observer(() => {
    const { bijouterieId, setBijouterieId, bijouterie, selectedBijouterie, lock } =
        useProps();
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
            </div>
            <div className="bodyBijouterie">
                <div className="article">
                    <h3>Описание изделия:</h3>
                    <Row label="Артикул" value={selectedBijouterie?.article} />
                    <Row
                        label="Наименов изделия"
                        value={selectedBijouterie?.resultAssemble}
                    />
                    <Row label="Вид" value={selectedBijouterie?.variant} />
                    <Row label="Длиина" value={selectedBijouterie?.length} />
                </div>
                <div className="article">
                    <h3>Замок:</h3>
                    <Row
                        label="Материал замка"
                        value={lock?.data ? lock?.data[0].material : ''}
                    />
                    <Row
                        label="Диаметр замка (мм)"
                        value={lock?.data ? lock?.data[0].size : ''}
                    />
                    <Row
                        label="Вид замка"
                        value={lock?.data ? lock?.data[0].material : ''}
                    />
                    <Row
                        label="Цвет замка"
                        value={lock?.data ? lock?.data[0].color : ''}
                    />
                    <Row label="Остаток" value={0} />
                </div>
            </div>
        </Wrapper>
    );
});
