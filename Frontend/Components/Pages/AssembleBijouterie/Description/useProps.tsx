import { useQuery } from '@tanstack/react-query';
import {
    iBigouterueBridje,
    iBijouterieArticles,
    iLock,
    iYarnAssemble,
} from '../../../../../Shared/Types/interfaces';
import { getMinorAccessoryLeftovers } from '../api';

export interface iProps {
    bijouterieBridge?: iBigouterueBridje[];
    bijouterie?: iBijouterieArticles[];
    bijouterieId?: number;
}
export const useProps = ({ bijouterie, bijouterieId, bijouterieBridge }: iProps) => {
    const selectedBijouterie = bijouterie?.find((item) => item.id == bijouterieId);
    const getData = <Key extends keyof iBigouterueBridje>(
        key: Key,
    ): iBigouterueBridje[Key] | undefined =>
        bijouterieBridge ? bijouterieBridge[0][key] : undefined;

    const lockId = getData('locksId');
    const locksLeftovers = useQuery(
        ['getMinorAccessoryLeftovers', lockId],
        () => getMinorAccessoryLeftovers(lockId!),
        { enabled: !!lockId },
    );
    const lock: iLock = {
        color: getData('lockColor'),
        id: lockId,
        material: getData('lockMaterial'),
        size: getData('lockSize'),
        type: getData('lockType'),
        count: locksLeftovers.data ? locksLeftovers.data[0]?.count || 0 : 0,
    };

    const yarnsAssemble: iYarnAssemble = {
        id: getData('yarnsAssembleId'),
        yarnAssemble: getData('yarnAssemble'),
        width: getData('yarnAssembleWidth'),
    };

    return { selectedBijouterie, lock, yarnsAssemble };
};
