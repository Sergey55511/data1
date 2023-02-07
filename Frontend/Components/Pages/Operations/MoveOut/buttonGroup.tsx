import { Badge, Button, Radio } from 'antd';
import { useProps } from './useProps';

export const ButtonGroup = ({ params }: { params: ReturnType<typeof useProps> }) => {
    return (
        <div className="buttonGroup">
            <Radio.Group
                value={params.buttonState}
                onChange={(e) => params.setButtonState(e.target.value)}
            >
                <Radio.Button value="lefovers">Остаток</Radio.Button>
                <Badge count={params.selectedRows.length} size="small">
                    <Radio.Button value="prepare">Подготовка</Radio.Button>
                </Badge>
            </Radio.Group>
            {params.buttonState == 'prepare' && (
                <Button
                    disabled={params.isDisabled}
                    type="primary"
                    onClick={params.submitData}
                    loading={params.isSubmitLoading}
                >
                    Провести
                </Button>
            )}
        </div>
    );
};
