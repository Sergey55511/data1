import { useProps } from './useProps';
import { Button, DatePicker, Select } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { InputNumber } from '../../../Shared/InputNumber';
import { SelectField } from '../../../Shared/SelectField';
const { RangePicker } = DatePicker;

export const DateFilter = ({
    filterDate,
    setFilterDate,
    listOperations,
    lot,
    setLot,
    pp,
    setPP,
    operations,
    operationId,
    setOperationId,
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
            <SelectField
                placeholder="Операция"
                value={operationId}
                onChange={(v) => setOperationId(v)}
                options={operations.data?.map((item) => ({
                    value: item.id,
                    caption: item.operation,
                }))}
                selectProps={{ style: { width: '150px' }, allowClear: true }}
            />
            <InputNumber
                placeholder="ПП"
                onChangeHandler={(v) => setPP(v)}
                style={{ width: '100px' }}
                value={pp}
                allowClear
            />
            <Button
                disabled={!(filterDate.start && filterDate.end)}
                type="primary"
                onClick={() => listOperations.refetch()}
                loading={listOperations.isFetching}
            >
                Выгрузить
            </Button>
        </div>
    );
};
