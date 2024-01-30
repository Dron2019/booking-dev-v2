import React from 'react';
import InfoAboutApartment from '../components/InfoAboutApartment';
import PopupWrapper from '../components/layouts/PopupWrapper';
import { Modal } from '@mui/material';
import PopupLayout from '../components/layouts/PopupLayout';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { useFlat } from '../contexts/FlatContext/useFlat';
import Loader from '../components/Loader';

export default function DiscountRequestPending({ flatId, navigate }) {

    const { flatInfo } = useFlat();

    return (
        <Modal
            open={true}
            onClose={() => navigate(routes.stage_discount_request_fill.replace(':flatId', flatId))}
        >
            <PopupWrapper>

                <InfoAboutApartment flatInfo={flatInfo} />
                <PopupLayout 

                    style={{
                        flexGrow: 1,
                        margin: 'auto',
                    }}
                    contentStyle={{
                    background: 'var(--Loader-gradient, linear-gradient(257deg, #6BCA4E 0%, #7CFAFC 100%))',
                    border: '1px solid var(--Stroke-100, #DCE2EB)',
                    flexGrow: 1
                }}>
                    <div className="text-style-1920-3-d-h-3 text-color-text-900" style={{
                        alignSelf: 'flex-start',
                        marginTop: '10vh',
                        margin: 'auto',
                        textAlign: 'center'
                    }}>
                        Триває перевірка на наявність знижки на ці апартаменти...
                    </div>
                    <Loader transparent/>
                </PopupLayout>
            </PopupWrapper>
        </Modal>
    )
}