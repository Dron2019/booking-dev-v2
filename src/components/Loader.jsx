import React from 'react';
 
export default function Loader({ transparent }){
    return (
        <div className={transparent ? "lds-roller-wrapper lds-roller-wrapper--transparent" : "lds-roller-wrapper"}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}