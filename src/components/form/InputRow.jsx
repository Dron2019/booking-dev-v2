import React from 'react';
import PropTypes from "prop-types"
 
export default function InputRow({ title, value, onChange, onFocus, error, errorText, success, inputPattern = '' }){

    const cn = ['InputRow'];
    if (error) cn.push('error');
    if (success) cn.push('success');

    return (
        <div className={cn.join(' ')}>
            <div className="text-style-1920-3-d-body text-color-text-700">{title}</div>
            <input
                className="text-style-1920-3-d-body"
                value={value}
                onFocus={onFocus}
                onChange={(e) => {
                    let valueToChange = e.target.value;
                    if (inputPattern) {
                        valueToChange = valueToChange.replace(new RegExp(inputPattern, 'gi'), '');
                    }
                    onChange(valueToChange);
                }}
            />
            {error && errorText && <div className="InputRow__error-message text-style-1920-3-d-tiny text-color-input-error">{errorText}</div>}
        </div>
    )
}
InputRow.propTypes = {
    error: PropTypes.string,
    success: PropTypes.bool,
    errorText: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    title: PropTypes.string,
    inputPattern: PropTypes.string,
    value: PropTypes.any
}
