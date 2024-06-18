import { Button } from 'antd';
import { InputNumber } from '../../../Shared/InputNumber';
import { Title } from '../../../Shared/Title';
import { iProps, useProps } from './useProps';
import { eTypeButton } from '../useProps';
import { Wrapper } from './style';

export const GetResult = (props: iProps) => {
    if (props.stateButton != eTypeButton.getResult) return null;
    const params = useProps(props);

    return (
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
        </Wrapper>
    );
};
