import {
    iBigouterueBridje,
    iBijouterieArticles,
    iLock,
    iYarnAssemble,
} from '../../../../../Shared/Types/interfaces';

export interface iProps {
    bijouterieBridge?: iBigouterueBridje[];
    bijouterie?: iBijouterieArticles[];
    bijouterieId?: number;
    lock: iLock;
}
export const useProps = ({ bijouterie, bijouterieId, bijouterieBridge }: iProps) => {
    const selectedBijouterie = bijouterie?.find((item) => item.id == bijouterieId);
    const getData = <Key extends keyof iBigouterueBridje>(
        key: Key,
    ): iBigouterueBridje[Key] | undefined =>
        bijouterieBridge ? bijouterieBridge[0][key] : undefined;

    const yarnsAssemble: iYarnAssemble = {
        id: getData('yarnsAssembleId'),
        yarnAssemble: getData('yarnAssemble'),
        width: getData('yarnAssembleWidth'),
    };

    return { selectedBijouterie, yarnsAssemble };
};
