import { observer } from 'mobx-react-lite';
import { OrderLayout } from '../../Shared/OrderLayout';
import { Assemble } from './Assemble';
import { Description } from './Description';
import { useProps } from './useProps';

export const AssembleBijouterie = observer(() => {
    const {
        bijouterieId,
        setBijouterieId,
        bijouterie,
        countItems,
        setCountItems,
        widthItems,
        setWidthItems,
        bijouterieBridge,
        countLocks,
        setCountLocks,
        lock,
    } = useProps();

    return (
        <OrderLayout
            title="Сборка бижутерия:"
            leftTitle="Описание изделия"
            rightTitle="Сборка"
            leftChildren={
                <Description
                    bijouterieBridge={bijouterieBridge.data}
                    bijouterie={bijouterie.data}
                    bijouterieId={bijouterieId}
                    lock={lock}
                />
            }
            rightChildren={
                <Assemble
                    {...{
                        bijouterieId,
                        setBijouterieId,
                        countItems,
                        setCountItems,
                        widthItems,
                        setWidthItems,
                        countLocks,
                        setCountLocks,
                        bijouterie,
                        bijouterieBridge,
                        lock,
                    }}
                />
            }
        />
    );
});
