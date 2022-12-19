import React from 'react';
import classes from "./MySelect.module.css";

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled={true} value={defaultValue}>{defaultValue}</option>
            {options.map(item =>
                <option key={item.value} value={item.value}>{item.name}</option>
            )}
        </select>
    );
};

export default MySelect;