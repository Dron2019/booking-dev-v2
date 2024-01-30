import React from 'react';
import PropTypes from 'prop-types';

import { uniqueId } from 'lodash';

function Checkbox({ id = uniqueId('chbx'), error, checked, onChange = () => { }, onClick = () => { }, value = '' }) {


    
    return (
        <div className={error ? "Checkbox error" : "Checkbox"}>
            <input
                onChange={onChange}
                onClick={onClick}
                type="checkbox"
                id={id}
                checked={checked}
                value={value}
            />
            <label htmlFor={id}>
                <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.5 11.4L10.875 15L16.5 9"
                        stroke="#444B55"
                        strokeWidth={3}
                        strokeLinecap="round"
                    />
                </svg>

            </label>
        </div>
    )
}

Checkbox.propTypes = {
    id: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    checked: PropTypes.any,
}
export default Checkbox;