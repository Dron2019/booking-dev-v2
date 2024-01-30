import PropTypes from "prop-types"
import React, { createContext, useState } from 'react';

// Create the context
const DiscountContext = createContext();

// Create the provider component
const DiscountProvider = ({ children }) => {

    const [discountInfo, setDiscountInfo] = useState(() => {
        const discountInfo = sessionStorage.getItem('discountInfo');
        if (!discountInfo) return {};
        return JSON.parse(discountInfo);
    });

    const setRequestedDiscount = (choosedDiscount) => {
        if (!discountInfo) {
            setDiscountInfo({
                requested_discount: choosedDiscount,
            });
        } else {
            setDiscountInfo({
                ...discountInfo,
                requested_discount: choosedDiscount,
            });
        }
    }

    // Value object to be passed to consumers
    const value = {
        discountInfo,
        setDiscountInfo,
        setRequestedDiscount
    };

    // Render the provider with the value object
    return (
        <DiscountContext.Provider value={value}>
            {children}
        </DiscountContext.Provider>
    );
};

DiscountProvider.propTypes = {
    children: PropTypes.any
}

export { DiscountContext, DiscountProvider };
