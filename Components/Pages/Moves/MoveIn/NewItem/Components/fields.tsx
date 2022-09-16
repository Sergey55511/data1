import { Input } from "antd";
import { iItem, iPrimeData } from "../constants";

export const Field = ({ item, onChange }: { item: iItem; onChange: (v: string) => void }) => (
    <div className="item">
        <Input
            placeholder={item.placeholder}
            value={item.value}
            onChange={(v) => onChange(v.target.value)}
            allowClear
        />
    </div>
);
export const PrimeField = ({
    primeData,
    fieldName,
    setPrameValue,
}: {
    primeData: iPrimeData;
    fieldName: keyof iPrimeData;
    setPrameValue: <T extends keyof iPrimeData>(
        key: T,
        value: iPrimeData[T]['value'],
    ) => void;
}) => (
    <div className="item">
        <Input
            placeholder={primeData[fieldName].placeholder}
            onChange={(v) => setPrameValue(fieldName, v.target.value)}
            value={primeData[fieldName].value}
            allowClear
        />
    </div>
);
