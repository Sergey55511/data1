import { iPrintBlank } from '../../../../../Shared/Types/interfaces';
import { CommonForm } from './Operations/CommonForm';
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
            <CommonForm number={2} name="Сверление" state="Распиленная" />
            <CommonForm number={3} name="Шлифование" state="Просверленная" />
            <CommonForm number={4} name="Галтование" state="Шлифованная" />
            <CommonForm number={5} name="Сверление водой" state="Галтованная" />
            <CommonForm number={6} name="Термообработка" state="Просверленная" />
            <CommonForm number={7} name="Печь-Галтование" state="Термообработ." />
            <CommonForm number={8} name="Полировка" state="Галтованная" />
        </>
    );
};
