import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { HeaderPrintBlank } from './Header';
import { Report } from './report';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const PrintBlank = observer(() => {
    const params = useProps();
    return (
        <Wrapper>
            <div className="rootContainer">
                <Link href="/" className="link">
                    Назад
                </Link>
                <HeaderPrintBlank
                    production={params.production}
                    setProduction={params.setProduction}
                />
                {params.isShowReport && (
                    <>
                        {params.produstionData.isFetching ? (
                            <>Загрузка...</>
                        ) : (
                            <Report produstionData={params.produstionData.data} />
                        )}
                    </>
                )}
            </div>
        </Wrapper>
    );
});
