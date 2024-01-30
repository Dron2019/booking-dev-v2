import React, { forwardRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { routes } from '../../routes';

// eslint-disable-next-line react/display-name
const PopupLayout = forwardRef(({ children, contentStyle = {}, ...props }, ref) => {
    const { flatId } = useParams();

    return (
        <div className="PopupLayout" {...props} ref={ref}>
            <Link to={routes.stage_flat.replace(':flatId', flatId)} className="PopupLayout__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L8 6.58579L12.2929 2.29289C12.6834 1.90237 13.3166 1.90237 13.7071 2.29289C14.0976 2.68342 14.0976 3.31658 13.7071 3.70711L9.41421 8L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L8 9.41421L3.70711 13.7071C3.31658 14.0976 2.68342 14.0976 2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929L6.58579 8L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z" fill="#111111"/>
                </svg>
            </Link>
            <div className="PopupLayout__border" style={contentStyle}>
                {children}
            </div>
        </div>
    );
});

export default PopupLayout;