import React, { FC, CSSProperties } from 'react';
import PropTypes from "prop-types"

type BorderColors = {
    fail: string; // Represents the color for a failed discount label.
    proposal: string;
    success: string;
    successWithBackground: string;
    default: string;
};

const borderColors: BorderColors = {
    fail: 'var(--color-fail-900)',
    proposal: 'var(--color-input-success)', 
    success: 'var(--color-accent-primary-800-primary)',
    successWithBackground: 'var(--color-input-success)',
    default: 'var(--Gray-3, #BDBDBD)',
}

interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number
}

const backgroundColors = {
    successWithBackground: 'var(--Green, #7BAD3B)',
}

type DiscountLabelProps = {
    type?: keyof BorderColors,
    value: string | number
}

const DiscountLabel: FC<DiscountLabelProps> = ({ type = 'default', value }) => {
    const style: CustomCSSProperties = {
        '--border-color': borderColors[type],
        '--background-color': backgroundColors[type] || 'transparent',
    }

    const cn: string[] = ['DiscountLabel'];

    if (backgroundColors[type]) {
        cn.push('DiscountLabel--with-bg');
    }

    return (
        <div className={cn.join(' ')} style={style}>
            {value}%
        </div>
    )
}

export default DiscountLabel;
