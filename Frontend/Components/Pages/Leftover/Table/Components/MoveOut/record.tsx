import { iData } from '../../../../../../../Shared/Types/interfaces';
import { KEYSLEFTOVERS } from '../../../../../Shared/Table/constants';
import { tConstKeys } from './useProps';

export const Record = ({ keys, record }: { keys: string[]; record: iData }) => {
    return (
        <div className="flex">
            {keys
                .filter((key) => {
                    const field = KEYSLEFTOVERS[key as tConstKeys]?.key;
                    if (
                        [
                            KEYSLEFTOVERS.width.key,
                            KEYSLEFTOVERS.count.key,
                            KEYSLEFTOVERS.numProduction.key,
                        ].includes(field)
                    )
                        return false;
                    return KEYSLEFTOVERS[key as tConstKeys]?.title;
                })
                .map((key) => {
                    return (
                        <div key={key} className="item">
                            <h3>{KEYSLEFTOVERS[key as tConstKeys].title}</h3>
                            <p>{record[key as keyof iData] as string}</p>
                        </div>
                    );
                })}
        </div>
    );
};
