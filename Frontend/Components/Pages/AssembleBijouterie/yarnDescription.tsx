import { iYarnAssemble } from '../../../../Shared/Types/interfaces';
import { Row } from './Row';

export const YarnDescription = ({ yarn }: { yarn?: iYarnAssemble }) => {
    if (!yarn) return null;
    return (
        <div className="descriptionWrapper">
            <h3>Нитка:</h3>
            <Row label="Цвет" value={yarn?.yarnAssemble} />
            <Row label="Толщина" value={yarn?.width} />
        </div>
    );
};
