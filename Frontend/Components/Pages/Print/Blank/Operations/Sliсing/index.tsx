import { Wrapper } from './style';
import { SignBlock } from '../../Components/SignBlock';
import { TableRow } from '../../Components/TableRow';
import { HeaderForm } from '../../Components/HeaderForm';
import { iPrintBlank } from '../../../../../../../Shared/Types/interfaces';
import { useRowData } from './useRowData';

export const Slicing = ({ produstionData }: { produstionData?: iPrintBlank[] }) => {
    const ROWDATA = useRowData(produstionData);
    return (
        <Wrapper>
            <div className="container">
                <div className="firstRow">
                    <div className="firstRowItem">
                        <div className="label">Модель:</div>
                        <div className="value">{produstionData![0]?.model}</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Профиль</div>
                        <div className="value">{produstionData![0]?.profile}</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Размер, мм.:</div>
                        <div className="value">{produstionData![0]?.sizeRangeModel}</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Длина, мм.:</div>
                        <div className="value">{produstionData![0]?.lengthModel}</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Отверстие, мм.:</div>
                        <div className="value">{produstionData![0]?.channel}</div>
                    </div>
                </div>
                <div className="secondRow">
                    <div className="numberPP">1</div>
                    <div className="operation">Распиливание</div>
                    {/* <div className="color">
                        <div className="label">Цвет:</div>
                        <div className="value">прозр.</div>
                    </div> */}
                </div>
                <HeaderForm state="Заготовка" />
                {ROWDATA.map((item, index) => (
                    <TableRow key={index} data={item} />
                ))}
                <SignBlock />
            </div>
        </Wrapper>
    );
};
