import React from 'react';
import PropTypes from "prop-types";
import useConfig from '../../hooks/useConfig';

export default function EnabledDiscountView({ children }){

    const { DISABLE_DISCOUNT } = useConfig();

    if (DISABLE_DISCOUNT) return null;

    return (
        <>
            {children}
        </>
    )
}

EnabledDiscountView.propTypes = {
    children: PropTypes.node,
}