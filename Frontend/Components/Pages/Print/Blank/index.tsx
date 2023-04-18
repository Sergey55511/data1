import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStores } from '../../../../Store/useStores';
import { HeaderPrintBlank } from './Header';
import { CommonForm } from './Operations/CommonForm';
import { Drilling } from './Operations/Drilling';
import { Slicing } from './Operations/Sliсing';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const PrintBlank = observer(() => {
    const params = useProps();
    return (
        <Wrapper>
            <div className="rootContainer">
                <Link href="/" className="link">
                    Назад
                </Link>
                <HeaderPrintBlank />
                <Slicing />
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
            </div>
        </Wrapper>
    );
});
