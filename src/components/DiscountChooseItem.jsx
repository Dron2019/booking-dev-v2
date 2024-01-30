import React, { useState } from 'react';
 
export default function DiscountChooseItem({ value, chanceText, color, textColor, active, onClick }){

    const toggle = () => onClick(!active);

    const cn = ['DiscountChooseItem'];

    if (active) {
        cn.push('active');
    }

    const style = active ? {
        '--color': textColor,
        '--text-color': color,
        // boxShadow: `0px 6px 20px 0px rgba(101, 154, 33, 0.80) inset, 0px 8px 20px 0px rgba(106, 149, 60, 0.50), 0px 4px 8px 0px rgba(53, 135, 24, 0.70)`
    } : {
        '--color': color,
        '--text-color': textColor,
        boxShadow: '0px 8px 12px 0px #D0D6DE'
    };

    return (
        <div onClick={toggle} className={cn.join(' ')} style={style}>
            <div className="DiscountChooseItem__title">
                {value}%
            </div>
            <div className="DiscountChooseItem__subtitle">
                ШАНС ОТРИМАННЯ ЗНИЖКИ
            </div>
            <div className="DiscountChooseItem__text">
                {chanceText}
            </div>

        </div>
    )
}