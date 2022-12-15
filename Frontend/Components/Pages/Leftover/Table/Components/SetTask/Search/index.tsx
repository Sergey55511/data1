import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { SelectField } from '../../../../../../Shared/SelectField';
import { iDataProps, State, tSetValue, useProps } from '../useProps';
import { Wrapper } from './style';

export const Search = ({
    data,
    state,
    setValue,
}: {
    data: iDataProps;
    state: State;
    setValue: tSetValue;
}) => {
    return (
        <Wrapper>
            <h4>Поиск</h4>
            <SelectField
                placeholder="Тип заготовки"
                value={state.workpieceTypeId.value}
                onChange={(v) => setValue('workpieceTypeId', v)}
                selectProps={{ loading: data.workpieceType.isLoading }}
                options={data.workpieceType.data?.map((item) => ({
                    value: item.id,
                    caption: item.workpieceType,
                }))}
            />
            <SelectField
                placeholder="Профиль"
                value={state.profileId.value}
                onChange={(v) => setValue('profileId', v)}
                selectProps={{
                    loading: data.profile.isLoading,
                    disabled: !state.workpieceTypeId.value,
                }}
                options={data.profile.data?.map((item) => ({
                    value: item.id,
                    caption: item.profile,
                }))}
            />
            <SelectField
                placeholder="Размер"
                value={state.sizeRangeModelId.value}
                onChange={(v) => setValue('sizeRangeModelId', v)}
                selectProps={{
                    loading: data.sizeRangeModel.isLoading,
                    disabled: !state.profileId.value,
                }}
                options={data.sizeRangeModel.data?.map((item) => ({
                    value: item.id,
                    caption: item.sizeRange,
                }))}
            />
        </Wrapper>
    );
};
