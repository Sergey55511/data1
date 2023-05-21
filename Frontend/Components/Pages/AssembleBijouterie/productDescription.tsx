import { iBijouterieArticles } from '../../../../Shared/Types/interfaces';
import { Row } from './Row';

export const ProductDescription = ({
    selectedBijouterie,
}: {
    selectedBijouterie?: iBijouterieArticles;
}) => {
    if (!selectedBijouterie) return null;
    return (
        <div className="descriptionWrapper">
            <h3>Описание изделия:</h3>
            <Row label="Артикул" value={selectedBijouterie?.article} />
            <Row label="Наименов изделия" value={selectedBijouterie?.resultAssemble} />
            <Row label="Вид" value={selectedBijouterie?.variant} />
            <Row label="Длиина" value={selectedBijouterie?.length} />
        </div>
    );
};
