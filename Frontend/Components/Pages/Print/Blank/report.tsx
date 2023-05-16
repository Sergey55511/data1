import { iPrintBlank } from '../../../../../Shared/Types/interfaces';
import { CommonForm } from './Operations/CommonForm';
import { Drilling } from './Operations/Drilling';
import { Slicing } from './Operations/Sliсing';

export const Report = ({
    produstionData,
    produstionId,
}: {
    produstionData?: iPrintBlank[];
    produstionId?: number;
}) => {
    return (
        <>
            <Slicing produstionData={produstionData} produstionId={produstionId} />
            <CommonForm number={2} name="Подбор заготовок" state="Распиленная" />
            <CommonForm number={3} name="Сверление" state="Распиленная" />
            <CommonForm number={4} name="Шлифование" state="Просверленная" />
            <CommonForm number={5} name="Галтование" state="Шлифованная" />
            <CommonForm number={6} name="Сверление водой" state="Галтованная" />
            <CommonForm number={7} name="Термообработка" state="Просверленная" />
            <CommonForm number={8} name="Печь" state="Термообработ." />
            <CommonForm number={9} name="Полировка" state="Галтованная" />
        </>
    );
};
