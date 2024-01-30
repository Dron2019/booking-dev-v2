import PropTypes from "prop-types"
import React, { createContext, useEffect, useState } from "react";
import { getBookInfo } from "../../api/api";
import { useLocation } from "react-router-dom";


export const LocalHistory = createContext();

export function LocalHistoryProvider({ children }) {

    
    const [localHistory, setLocalHistory] = useState([]);

    const location = useLocation();

    useEffect(() => {
        setLocalHistory([...localHistory, location.pathname]);
        // console.log(localHistory);
    }, [location]);


    return (
        <LocalHistory.Provider value={localHistory}>
            {children}
        </LocalHistory.Provider>
    )
}
LocalHistoryProvider.propTypes = {
    children: PropTypes.node.isRequired
}

