import { useStores } from '../../../../Store/useStores';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { STORES } from '../../../../../Shared/constants';

export const useColumns = (
    filters: Record<string, FilterValue | null>,
    data: iData[],
) => {
    const { loginStore } = useStores();

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const filteredleftovers = data.filter((item) => {
        for (const key in item) {
            const value: any = item[key as keyof typeof item];
            if (filters[key]?.length) {
                if (!filters[key]?.includes(value)) {
                    return false;
                }
            }
        }
        return true;
    });

    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iData> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.pp.key),
        title: KEYSLEFTOVERS.pp.title,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
            title: KEYSLEFTOVERS.productionId.title,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.operation.key),
        title: KEYSLEFTOVERS.operation.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.userLogin.key),
        title: KEYSLEFTOVERS.userLogin.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.manager.key),
        title: KEYSLEFTOVERS.manager.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
        title: KEYSLEFTOVERS.state.title,
    });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.fraction.key),
            title: KEYSLEFTOVERS.fraction.title,
        });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup.key),
            title: KEYSLEFTOVERS.materialGroup.title,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
        title: KEYSLEFTOVERS.color.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
        title: KEYSLEFTOVERS.sizeRange.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
        title: KEYSLEFTOVERS.length.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
        title: KEYSLEFTOVERS.grade.title,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.model.key),
            title: KEYSLEFTOVERS.model.title,
        });

    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
        title: KEYSLEFTOVERS.type.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel.key),
            title: KEYSLEFTOVERS.channel.title,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
        title: 'В работе гр.',
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
            title: 'В работе шт.',
        });

    return { columns };
};
