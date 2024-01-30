import PropTypes from "prop-types"
import React from 'react';

export default function UserDataList({ fields = [], sort }){

    return (
        <div className='UserDataList'>
            {fields.map((field, i) => (
                    <div className='UserDataList__row' key={i}>
                        <div className='UserDataList__label'>
                            {field.label}
                        </div>
                        <div className='UserDataList__value'>
                            {field.value}
                        </div>
                    </div>
                )
            )}

        </div>
    )
}
UserDataList.propTypes = {
    sort: PropTypes.bool,
    fields: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    })),
}
