import { NextApiRequest } from 'next';
import striptags from 'striptags';

export const extractData = (req: NextApiRequest) => {
    const getNumber = (v: any) => (v ? +v : undefined);
    const data = req.body;
    const description: string = striptags(data.description);
    const id = getNumber(data.id);
    const fullModelId = getNumber(data.fullModelId);
    const active = data.active;

    return { id, description, fullModelId, active };
};
