import { readdir } from 'fs/promises';
//@ts-ignore
import List from 'prompt-list';
import { switcherUpdateList } from './Lists';

export const selectFolder = async (source = 'ListsDB/Lists') => {
    const choices = (await readdir(source, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    const list = new List({
        name: 'nameList',
        message: 'select update list',
        choices,
    });

    //@ts-ignore
    list.ask((answer) => {
        switcherUpdateList(answer);
    });
};
