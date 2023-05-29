import { useMutation } from '@tanstack/react-query';
import * as api from '../api';

export const useSubmit = () => {
    const submit = useMutation(
        (data: { accessoriesData: { idAccessory: number; countOut: number } }) => {
            return api.postMinorAccessoryLeftovers(data.accessoriesData);
        },
    );
    return { submit };
};
