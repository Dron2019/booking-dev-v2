import PropTypes from "prop-types"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getBookInfo } from "../../api/api";


export const FlatContext = createContext();

export function FlatContextProvider({ children }) {

    const [ flatInfo, setFlatInfo ] = useState(undefined);

    const [flatInfoWithDiscount, setFlatInfoWithDiscount] = useState({});

    const getFlatInfoWithDiscount = (id) => {
        getBookInfo(id).then((data) => {
            // console.log('data.data.data.data', data.data.data.data);
            setFlatInfoWithDiscount(data.data.data.data);
        });
    }

    

    const clearRequestedFlatInfoWithDiscount = useCallback(() => {
        setFlatInfoWithDiscount({});
    }, []);

    const value = useMemo(() => {
        return {
            flatInfo,
            getFlatInfoWithDiscount,
            setFlatInfo,
            flatInfoWithDiscount, 
            setFlatInfoWithDiscount,
            clearRequestedFlatInfoWithDiscount
        }
    }, [flatInfo, flatInfoWithDiscount])

    return (
        <FlatContext.Provider value={value}>
            {children}
        </FlatContext.Provider>
    )
}
FlatContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

