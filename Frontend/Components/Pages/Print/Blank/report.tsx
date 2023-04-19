import { iPrintBlank } from '../../../../../Shared/Types/interfaces';
import { CommonForm } from './Operations/CommonForm';
import { Drilling } from './Operations/Drilling';
import { Slicing } from './Operations/Sliсing';

export const Report = ({ produstionData }: { produstionData?: iPrintBlank[] }) => {
    return (
        <>
            <Slicing produstionData={produstionData} />
            <CommonForm number={2} name="Подбор заготовок" state="Распиленная" />
            <CommonForm number={3} name="Сверление" state="Распиленная" />
            <CommonForm number={4} name="Шлифование" state="Просверленная" />
            <CommonForm number={5} name="Галтование" state="Шлифованная" />
            <Drilling
                number={6}
                name="Сверление водой"
                color="прозр."
                state="Галтованная"
            />
            <CommonForm number={7} name="Термообработка" state="Просверленная" />
            <CommonForm number={8} name="Печь" state="Термообработ." />
            <CommonForm number={9} name="Галтование" state="Запеченая" />
            <CommonForm number={10} name="Полировка" state="Галтованная" />
        </>
    );
};
