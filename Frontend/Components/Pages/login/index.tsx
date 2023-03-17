import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { Menu } from 'antd';
import Login from './Components/Login';
import { Registration } from './Components/Registration';
import amber from './Images/amber.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { items, useProps } from './useProps';

export default observer(() => {
    const { isAdmin, onClick, current, containerName } = useProps();

    return (
        <Wrapper>
            <div className="formWrapper">
                <motion.div
                    className="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <h2>{containerName.data}</h2>
                    {isAdmin && (
                        <div className="menu">
                            <Menu
                                onClick={onClick}
                                selectedKeys={[current]}
                                mode="horizontal"
                                items={items}
                            />
                        </div>
                    )}
                    {current == 'login' && <Login />}
                    {current == 'registration' && <Registration />}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="stoneWrapper"
            >
                <Image layout="fill" objectFit="contain" src={amber.src} alt="amber" />
            </motion.div>
        </Wrapper>
    );
});
