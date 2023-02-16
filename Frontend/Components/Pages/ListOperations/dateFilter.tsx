import { MenuLeftovers } from '../../Shared/MenuLeftovers';
import { Wrapper } from './style';
import { TableApp } from '../../Shared/Table';
import { observer } from 'mobx-react-lite';
import { iFilterDate, useProps } from './useProps';
import { Button, DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { iData } from '../../../../Shared/Types/interfaces';
const { RangePicker } = DatePicker;

export const DateFilter = ({
    filterDate,
    setFilterDate,
    listOperations,
}: {
    filterDate: iFilterDate;
    setFilterDate: Dispatch<SetStateAction<iFilterDate>>;
    listOperations: UseQueryResult<iData[], unknown>;
}) => {
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        if (current > moment().endOf('day')) return true;
        return current && current < moment().subtract(6, 'month').endOf('day');
    };

    return (
        <div className="dateFilterWrapper">
            <RangePicker
                disabledDate={disabledDate}
                value={[filterDate.start, filterDate.end]}
                onChange={(value) => {
                    setFilterDate({
                        start: value ? value[0] : null,
                        end: value ? value[1] : null,
                    });
                }}
            />
            <Button
                disabled={!(filterDate.start && filterDate.end)}
                type="primary"
                onClick={() => listOperations.refetch()}
                loading={listOperations.isLoading}
            >
                Выгрузить
            </Button>
        </div>
    );
};
