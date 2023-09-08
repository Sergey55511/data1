import { useProps } from './useProps';
import { Button, DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { InputNumber } from '../../../Shared/InputNumber';

export const DateFilter = ({
    filterDate,
    setFilterDate,
    listMoveInDocuments,
    lot,
    setLot,
}: ReturnType<typeof useProps>) => {
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        if (current > moment().endOf('day')) return true;
        if (current < moment(filterDate.start)) return true;
        if (current > moment(filterDate.start).add(31, 'days')) return true;
        return false;
    };

    return (
        <div className="dateFilterWrapper">
            <DatePicker
                value={filterDate.start}
                onChange={(value) => {
                    setFilterDate({
                        start: value,
                        end: null,
                    });
                }}
                format="DD.MM.YYYY"
            />
            <DatePicker
                disabledDate={disabledDate}
                disabled={!filterDate.start}
                value={filterDate.end}
                onChange={(value) => {
                    setFilterDate((state) => ({ ...state, end: value }));
                }}
                format="DD.MM.YYYY"
            />
            <InputNumber
                placeholder="Партия"
                onChangeHandler={(v) => setLot(v)}
                style={{ width: '100px' }}
                value={lot}
                allowClear
            />
            <Button
                disabled={!(filterDate.start && filterDate.end)}
                type="primary"
                onClick={() => listMoveInDocuments.refetch()}
                loading={listMoveInDocuments.isFetching}
            >
                Выгрузить
            </Button>
        </div>
    );
};
