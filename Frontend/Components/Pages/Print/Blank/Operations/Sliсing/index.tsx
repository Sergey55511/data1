import { Wrapper } from './style';
import { SignBlock } from '../../Components/SignBlock';
import { TableRow } from '../../Components/TableRow';
import { HeaderForm } from '../../Components/HeaderForm';
import { iPrintBlank } from '../../../../../../../Shared/Types/interfaces';
import { useRowData } from './useRowData';
import { useGetProductionList } from '../../useGetProductionList';
import { NameForm } from '../../Components/NameForm';

export const Slicing = ({
    produstionData,
    produstionId,
}: {
    produstionData?: iPrintBlank[];
    produstionId?: number;
}) => {
    const productionList = useGetProductionList();
    const production = productionList.data?.find((item) => item.id == produstionId);
    const ROWDATA = useRowData(produstionData);
    return (
        <Wrapper>
            <div className="container">
                <div className="firstRow">
                    <div className="firstRowItem">
                        <div className="label">#пр-ва:</div>
                        <div className="value">{production?.id}</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Тип:</div>
                        <div className="value">{produstionData![0]?.type}</div>
                    </div>
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
                <NameForm number={1} name="Распиливание" />
                <HeaderForm state="Заготовка" />
                {ROWDATA.map((item, index) => (
                    <TableRow key={index} data={item} />
                ))}
                <SignBlock />
            </div>
        </Wrapper>
    );
};
