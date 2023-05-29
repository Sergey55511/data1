import { iLock } from '../../../../Shared/Types/interfaces';
import { Row } from './Row';

export const LockDescription = ({ lock }: { lock?: iLock }) => {
    if (!lock) return null;
    return (
        <div className="descriptionWrapper">
            <h3>Замок:</h3>
            <Row label="Материал замка" value={lock.material} />
            <Row label="Диаметр замка (мм)" value={lock.size} />
            <Row label="Вид замка" value={lock.material} />
            <Row label="Цвет замка" value={lock.color} />
            <Row label="Остаток" value={lock.count} />
        </div>
    );
};
