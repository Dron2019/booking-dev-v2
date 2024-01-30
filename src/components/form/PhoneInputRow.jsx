import PropTypes from "prop-types"
import React from 'react';
import PhoneInput from 'react-phone-number-input';
 
export default function PhoneInputRow({ title, value, onChange, onFocus, error, errorText, success }){

    const cn = ['InputRow'];
    if (error) cn.push('error');
    if (success) cn.push('success');

    return (
        <div className={cn.join(' ')}>
            <div className="text-style-1920-3-d-body text-color-text-700">{title}</div>
            <PhoneInput
                className="text-style-1920-3-d-body"
                international
                onFocus={onFocus}
                defaultCountry="UA"
                placeholder={title}
                value={value}
                onChange={onChange}/>
            {error && errorText && <div className="InputRow__error-message text-style-1920-3-d-tiny text-color-input-error">{errorText}</div>}
        </div>
    )
}

PhoneInputRow.propTypes = {
    error: PropTypes.string,
    success: PropTypes.bool,
    errorText: PropTypes.any,
    onChange: PropTypes.func,
    title: PropTypes.any,
    onFocus: PropTypes.any,
    value: PropTypes.any
}
