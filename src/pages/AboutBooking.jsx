import { Box, Grid, Modal } from '@mui/material';
import React from 'react';
import ButtonLarge from '../components/buttons/ButtonLarge';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../routes';
import { BrowserView, MobileView } from 'react-device-detect';
import EnabledDiscountView from '../components/layouts/EnabledDiscountView';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    width: 'min(800px, 100%)',
    bgcolor: 'background.paper',
    borderRadius: '40px',
    p: 4,
};


export default function AboutBooking({ onClose = () => {}, discountInfo = {} }){

    const { flatId } = useParams();

    return (
        <Modal open={true} className='AboutBooking'>
            <Box sx={style}>
                <div 
                    className="PopupLayout__close"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L8 6.58579L12.2929 2.29289C12.6834 1.90237 13.3166 1.90237 13.7071 2.29289C14.0976 2.68342 14.0976 3.31658 13.7071 3.70711L9.41421 8L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L8 9.41421L3.70711 13.7071C3.31658 14.0976 2.68342 14.0976 2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929L6.58579 8L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z" fill="#111111"/>
                    </svg>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <div className="text-style-1920-3-d-h-3 text-color-text-900">
                            Що таке бронювання апартаментів?
                        </div>
                        <BrowserView>
                            <AboutBookingLink to={routes.stage_booking_request_fill.replace(':flatId', flatId)}/>
                        </BrowserView>
                    </Grid>
                    <Grid item xs={12} lg={6} rowGap={1} display={'flex'} flexDirection={'column'}>

                        <div className="text-style-1920-3-d-body text-color-text-700">
                            Під бронюванням апартаментів мається на увазі <span className='text-style-1920-3-d-body-bold text-color-text-900'>
                                закріплення апартаментів за вами або даними людини, на яку ви оформите заявку.
                            </span>
                        </div>
                        <div className="text-style-1920-3-d-body text-color-text-700">
                            Сума апартаментів на момент бронювання <div className="text-style-1920-3-d-body-bold text-color-text-900">зберігається до закінчення вашої броні. </div>
                            Тривалість броні n днів. Щоб забронювати апартаменти оплатіть бронь. 
                            <span className='text-style-1920-3-d-body-bold text-color-text-900'>Сума броні складає {discountInfo.booking_price} грн.</span>
                        </div>
                        <MobileView>
                            <AboutBookingLink to={routes.stage_booking_request_fill.replace(':flatId', flatId)}/>
                        </MobileView>
                        <EnabledDiscountView>
                            <ButtonLarge onClick={onClose}>
                                ХОЧУ ОТРИМАТИ ЗНИЖКУ НА ЦІ АПАРТАМЕНТИ
                            </ButtonLarge>
                        </EnabledDiscountView>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

function AboutBookingLink({ to }) {
    return (
        <Link to={to} >
            <ButtonLarge style={{ width: '100%' }}>
                ПЕРЕЙТИ ДО БРОНЮВАННЯ
            </ButtonLarge>
        </Link>
    )
}