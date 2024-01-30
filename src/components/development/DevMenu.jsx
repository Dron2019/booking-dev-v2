import React, { useEffect } from 'react';
import { routes } from '../../routes';
import { Link, useParams } from 'react-router-dom';
import { isDev } from '../../api/api';

export default function DevMenu(){

    const params = useParams();
    
    useEffect(() => {
        if (isDev) {
            setTimeout(() => {
                window.dispatchEvent(new Event('historyUpdated'));
            }, 100);
        }
    }, []);  

    return (
        <div className='DevMenu'>
        {
            Object.entries(routes).map(([key, value]) => (
                <Link key={key} to={value.replace(':flatId', params)}>{key}</Link>
            ))
        }
        </div>
    )
}