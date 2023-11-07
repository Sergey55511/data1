import { DownloadExcel } from '../DownloadExcel';
import { OptimizationData } from '../OptimizationData';
import { Wrapper } from './style';

export const Content = () => {
    return (
        <Wrapper>
            <OptimizationData />
            <DownloadExcel />
        </Wrapper>
    );
};
