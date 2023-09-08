import { Dispatch, SetStateAction } from 'react';
import { IsShowModals } from '../..';
import { SupportManagers } from '../SupportManagers';

export const Modals = ({
    isShowModals,
    setIsShowModals,
}: {
    isShowModals: IsShowModals;
    setIsShowModals: Dispatch<SetStateAction<IsShowModals>>;
}) => {

    return (
        <>
            {isShowModals.supportManagers && (
                <SupportManagers
                    onClose={() =>
                        setIsShowModals((prev) => ({ ...prev, supportManagers: false }))
                    }
                />
            )}
        </>
    );
};
