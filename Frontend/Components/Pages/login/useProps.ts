import { MenuProps } from 'antd';
import { Wrapper } from './style';
import { useEffect, useState } from 'react';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { Menu } from 'antd';
import Login from './Components/Login';
import { Registration } from './Components/Registration';
import amber from './Images/amber.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getContainerName } from '../../../Store/UIStore/api';

export const items: MenuProps['items'] = [
    {
        label: 'Логин',
        key: 'login',
    },
    {
        label: 'Регистрация',
        key: 'registration',
    },
];

export const useProps = () => {
    const [current, setCurrent] = useState<'login' | 'registration'>('login');
    const { loginStore, ErrorStore } = useStores();

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key as typeof current);
    };
    useEffect(() => {
        ErrorStore.resetError();
        loginStore.whoami();
    }, []);

    const isAdmin = loginStore.user.status == 'admin';

    const containerName = useQuery(['containerName'], getContainerName);

    return { isAdmin, onClick, current, containerName };
};
