import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ButtonLarge from '../buttons/ButtonLarge';
import Loader from '../Loader';
import SummaryDocument from './SummaryDocument';

export default function SummaryDocumentLink({bookingResult = {}, project_title}) {
    return (
        <ButtonLarge>
            <PDFDownloadLink
                document={
                    <React.Suspense fallback={<Loader/>}>
                        <SummaryDocument bookingResult={bookingResult} />
                    </React.Suspense>
                }
                fileName={[project_title, bookingResult.liqpay_order_id, ".pdf"].join('_')}
            >
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Завантажити квитанцію')}
            </PDFDownloadLink>
            &nbsp;
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_3794_3482)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.99992 11.5858L4.70703 7.29289L3.29282 8.70711L9.29282 14.7071L9.99992 15.4142L10.707 14.7071L16.707 8.70711L15.2928 7.29289L10.9999 11.5858L10.9999 2L8.99992 2L8.99992 11.5858Z" fill="#F1F4F9" />
                </g>
                <defs>
                    <filter id="filter0_d_3794_3482" x="2.29297" y="2" width="15.4141" height="15.4141" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.4 0 0 0 0 0.596078 0 0 0 0 0.152941 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3794_3482" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3794_3482" result="shape" />
                    </filter>
                </defs>
            </svg>

        </ButtonLarge>
    )
}