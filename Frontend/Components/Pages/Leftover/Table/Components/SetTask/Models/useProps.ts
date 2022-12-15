import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useEffect, useState } from 'react';
import { iDataProps } from '../useProps';
import { Task } from '../../MoveOut/useProps';

class StateModel {
    id = 0;
    model = '';
}

export interface iProps {
    data: iDataProps;
    submitButton: (data: Task) => void;
}

export const useProps = ({ data, submitButton }: iProps) => {
    const [state, setState] = useState<StateModel>(new StateModel());
    const [search, setSearch] = useState('');

    useEffect(() => {
        setState(new StateModel());
    }, [data]);

    const dataFiltred = data.fullModels.data?.filter((item) => {
        return item.fullModel.toLowerCase().split(search.toLowerCase()).length > 1;
    });

    const SubmitHandler = () => {
        submitButton({ id: state.id, task: state.model });
    };

    return { state, setState, search, setSearch, dataFiltred, SubmitHandler };
};
