import isArray from 'lodash/isArray';
import { iValue } from '.';

export const Cell = ({ value }: { value: iValue }) => {
    let className = '';
    if (isArray(value.class)) {
        value.class.map((item) => (className += ` ${item}`));
    } else {
        className = value.class ?? '';
    }
    return <div className={`cell ${className}`}>{value.value}</div>;
};
