import React from 'react';
 
export default function UserDataTable({ fields = [] }){
    return (
        <div className='UserDataTable'>
            {fields.map((field, i) => (
                <div className='UserDataTable__row' key={i}>
                    <div className='UserDataTable__label'>
                        {field.label}
                    </div>
                    <div className='UserDataTable__value'>
                        {field.value}
                    </div>
                </div>
            )
        )}
        </div>
    )
}