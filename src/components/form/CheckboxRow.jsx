import React from 'react';
import PropTypes from "prop-types"
import Checkbox from "./Checkbox";

export default function CheckboxRow({ title, checked, onChange, error, errorText, defaultChecked }){

    const cn = ['CheckboxRow'];
    if (error) cn.push('error');

    return (
        <div className={cn.join(' ')}>
            <Checkbox
                checked={checked}
                defaultChecked={defaultChecked}
                error={error}
                onClick={(value) => onChange(value)}
            />
            <div className="text-style-1920-3-d-body text-color-text-700">{title}</div>
            {error && errorText && <div className="CheckboxRow__error-message text-style-1920-3-d-tiny text-color-input-error">{errorText}</div>}
        </div>
    )
}
CheckboxRow.propTypes = {
    error: PropTypes.string,
    errorText: PropTypes.string,
    onChange: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.any
}
