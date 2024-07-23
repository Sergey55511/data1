import { Button } from 'antd';
import { InputNumber } from '../../../../Shared/InputNumber';
import { Title } from '../../../../Shared/Title';
import { iProps, useProps } from './useProps';
import { Wrapper } from './style';
import { SelectField } from '../../../../Shared/SelectField';
import { observer } from 'mobx-react-lite';

export const Form = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <>
            <Wrapper>
                <div className="row">
                    <Button
                        type="primary"
                        disabled={params.disabled}
                        onClick={params.subbmitHandler}
                        loading={params.isLoading}
                    >
                        Сохранить
                    </Button>
                </div>
                <div className="row">
                    <Title text="Модель:" />
                    <div className="value">{params.model}</div>
                </div>
                <div className="row">
                    <Title text="Артикул:" />
                    <div className="value">{params.complect?.articleId}</div>
                </div>
                <div className="row">
                    <Title text="Длинна:" />
                    <InputNumber
                        placeholder={'Введите длинну изделия'}
                        onChangeHandler={(v) => {
                            params.setLength(v);
                        }}
                        value={params.length}
                        allowClear
                    />
                </div>
                <div className="row">
                    <Title text="Вес:" />
                    <InputNumber
                        placeholder={'Введите вес изделия'}
                        onChangeHandler={(v) => {
                            params.setWidth(v);
                        }}
                        value={params.width}
                        allowClear
                    />
                </div>
                <div className="row">
                    <Title text="Cборщик:" />
                    <SelectField
                        placeholder="Выберите изделие"
                        value={params.managerId}
                        onChange={params.setManagerId}
                        options={params.managers.data?.map((item) => ({
                            value: item.id,
                            caption: item.name,
                        }))}
                    />
                </div>
            </Wrapper>
        </>
    );
});
