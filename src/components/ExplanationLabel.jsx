import React from 'react';
import IconInfo from '../assets/icons/icon-info';

export default function ExplanationLabel({ children, hideIcon, onIconClick = () => {}}) {
    return (
        <div className='ExplanationLabel'>
            {!hideIcon && <IconInfo onClick={onIconClick}/>}
            <div className="ExplanationLabel__content">
                {children}
            </div>
        </div>
    )
}