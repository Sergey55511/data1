import { Divider, Input } from 'antd';
import { iLeftovers } from '../../../../../../../Shared/Types/interfaces';
import { MyDrawer } from '../../../../../Shared/MyDrawer';
import { KEYSLEFTOVERS } from '../../constants';
import { NumProduction } from '../NumProduction';
import { Wrapper } from './style';

type tConstKeys = keyof typeof KEYSLEFTOVERS;

export const MoveOutSolo = ({ record }: { record: iLeftovers }) => {
    const keys = Object.keys(record);
    const setNumProduction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        MyDrawer({
            title: 'Производства',
            content: <NumProduction />,
        });
    };

    return (
        <Wrapper>
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
                                <p>{record[key as keyof iLeftovers]}</p>
                            </div>
                        );
                    })}
            </div>
            <Divider />
            <div className="flex">
                <div className="item">
                    <h3>{KEYSLEFTOVERS.width.title}</h3>
                    <p>{record.width}</p>
                </div>
                <div className="item">
                    <h3>{KEYSLEFTOVERS.count.title}</h3>
                    <p>{record.count}</p>
                </div>
            </div>
            <div className="flex">
                <div className="item">
                    <div>
                        <Input placeholder="Выдать" disabled={!record.width} />
                    </div>
                </div>
                <div className="item">
                    <div>
                        <Input placeholder="Выдать" disabled={!record.count} />
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex">
                <div className="itemNumProduction">
                    <div>
                        <h3>{KEYSLEFTOVERS.numProduction.title}</h3>
                        {record.numProduction ? (
                            <div>№ ПП {record.numProduction}</div>
                        ) : (
                            <a href="#" onClick={setNumProduction}>
                                Выбрать номер производства
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
