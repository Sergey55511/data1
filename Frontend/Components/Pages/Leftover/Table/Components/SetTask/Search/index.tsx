import { SelectField } from '../../../../../../Shared/SelectField';
import { useProps } from '../useProps';
import { Wrapper } from './style';

export const Search = () => {
    const { data, state } = useProps();
    return (
        <Wrapper>
            <h4>Поиск</h4>
            <SelectField
                placeholder="Тип заготовки"
                value={state.workpieceTypeId.value}
                onChange={(v) => console.log(v)}
                selectProps={{ loading: data.workpieceType.isLoading }}
                options={data.workpieceType.data?.map((item) => ({
                    value: item.id,
                    caption: item.workpieceType,
                }))}
            />
            {/* <SelectField
                placeholder="Модель"
                value={state.modelId.value}
                onChange={(v) => console.log(v)}
                selectProps={{ loading: data.model.isLoading }}
                options={data.model.data?.map((item) => ({
                    value: item.id,
                    caption: item.model,
                }))}
            /> */}
            <SelectField
                placeholder="Профиль"
                value={state.profileId.value}
                onChange={(v) => console.log(v)}
                selectProps={{ loading: data.profile.isLoading }}
                options={data.profile.data?.map((item) => ({
                    value: item.id,
                    caption: item.profile,
                }))}
            />
            <SelectField
                placeholder="Размер"
                value={state.sizeRangeModelId.value}
                onChange={(v) => console.log(v)}
                selectProps={{ loading: data.sizeRangeModel.isLoading }}
                options={data.sizeRangeModel.data?.map((item) => ({
                    value: item.id,
                    caption: item.sizeRange,
                }))}
            />
            {/* <SelectField
                placeholder="Длинна"
                value={state.lengthModelId.value}
                onChange={(v) => console.log(v)}
                selectProps={{ loading: data.lengthModel.isLoading }}
                options={data.lengthModel.data?.map((item) => ({
                    value: item.id,
                    caption: item.length,
                }))}
            /> */}
        </Wrapper>
    );
};
