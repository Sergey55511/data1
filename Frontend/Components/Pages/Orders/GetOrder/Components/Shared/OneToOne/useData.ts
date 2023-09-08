import { useQuery } from '@tanstack/react-query';
import { getChannel } from '../../../../../../../Store/Lists/api';

export const useData = () => {
    const channel = useQuery(['channel'], getChannel);
    return { channel };
};
