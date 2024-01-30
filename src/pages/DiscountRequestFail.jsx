import PropTypes from "prop-types"
import React from 'react';
import InfoAboutApartment from '../components/InfoAboutApartment';
import PopupWrapper from '../components/layouts/PopupWrapper';
import { Box, Grid, Modal } from '@mui/material';
import PopupLayout from '../components/layouts/PopupLayout';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import DiscountLabel from '../components/DiscountLabel';
import BookingFaq from '../components/BookingFaq';
import UserDataTable from '../components/UserDataTable';
import Dashboard from '../components/Dashboard';
import IconInfo from '../assets/icons/icon-info';
import ButtonLarge from '../components/buttons/ButtonLarge';
import BookingDeadlineFaq from '../components/BookingDeadlineFaq';
import currency from 'currency.js';
import useCurrencies from '../hooks/useCurrencies';
import { useFlat } from "../contexts/FlatContext/useFlat";
import IconFail from "../assets/icons/IconFail";

const topRowsSizes = {
    small: {
        xs: 3,
        md: 2.4
    },
    large: {
        xs: 9,
        md: 9.6
    }
}

export default function DiscountRequestFail({ flatId, navigate, discountInfo, userData }) {

    const { flatInfo } = useFlat();
    const currencyList = useCurrencies();

    if (!discountInfo) return null;


    const userDataTableFieldsToRender = [
        ...userData.filter(field => /text|email|phone/.test(field.type)),
        {
            label: 'Очікувана сума вигоди: ',
            value: <>
                <div>{currency(flatInfo.price_usd).multiply(+discountInfo.proposal_discount / 100).value} {currencyList['USD']}</div>
                <div>{currency(flatInfo.price_uah).multiply(+discountInfo.proposal_discount / 100).value} {currencyList['UAH']}</div>
            </>
        }
    ];

    

    return (
        <Modal
            open={true}
            onClose={() => navigate(routes.stage_discount_request_fill.replace(':flatId', flatId))}
        >
            <PopupWrapper>
                <InfoAboutApartment flatInfo={flatInfo} />
                <PopupLayout>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <Box className='MuiBox-black-border-large'>
                                <Grid container spacing={2}>
                                    <Grid item {...topRowsSizes['small']}>
                                        <IconFail/>
                                    </Grid>
                                    <Grid item {...topRowsSizes['large']} className="text-style-1920-3-d-h-1 text-color-fail-900" textAlign={'left'} display={'flex'} alignItems={'center'}>
                                        Упс...
                                    </Grid>
                                    <Grid item {...topRowsSizes['small']} marginBottom={-2}>
                                        <DiscountLabel type='fail' value={discountInfo['requested_discount']} />
                                        <svg style={{
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                display: 'block',
                                        }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99985 11.1716L3.41406 6.58579L0.585636 9.41421L8.58564 17.4142L9.99985 18.8284L11.4141 17.4142L19.4141 9.41421L16.5856 6.58579L11.9998 11.1716L11.9998 -3.24086e-07L7.99985 -4.98931e-07L7.99985 11.1716Z" fill="var(--color-fail-900)"/>
                                        </svg>
                                    </Grid>
                                    <Grid item {...topRowsSizes['large']}  className="text-style-1920-3-d-h-2  text-color-text-900">
                                        Знижка неможлива за цими апартаментами
                                    </Grid>
                                    <Grid item {...topRowsSizes['small']}>
                                        <DiscountLabel type='proposal' value={discountInfo['proposal_discount']} />
                                    </Grid>
                                    <Grid item {...topRowsSizes['large']}  className="text-style-1920-3-d-body text-color-text-700">
                                        По цьому приміщенню ми можемо запропонувати вам {discountInfo['proposal_discount']}% знижки.
                                        <span className="text-style-1920-3-d-body-bold text-color-text-900"> 
                                            &nbsp;Якщо вам це підходить, просимо забронювати апартаменти! 
                                        </span>
                                        Наші менеджери вже працюють над тим, щоб погодити більш вигідні умови.
                                    </Grid>
                                    <Grid item xs={12}>
                                        <UserDataTable fields={userDataTableFieldsToRender} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link to={routes.stage_booking_request_fill.replace(':flatId', flatId)}>
                                            <ButtonLarge>
                                                ПЕРЕЙТИ ДО ОПЛАТИ БРОНЮВАННЯ АПАРТАМЕНТІВ ({discountInfo.booking_price} ГРН)
                                            </ButtonLarge>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BookingDeadlineFaq/>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <BookingFaq
                                        goToRoute={() => {
                                            navigate(routes.about_booking.replace(':flatId', flatId));
                                        }}
                                        booking_price={discountInfo.booking_price + ' ' +  currencyList['UAH']} 
                                        booking_deadline={discountInfo.booking_deadline}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className="MuiBox-gray-border-large">
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item xs={1.5} md={1} >
                                                <IconInfo/>
                                            </Grid>
                                            <Grid item xs={10.5} md={11} className="text-style-1920-3-d-h-3 text-color-text-900" gap={0} display={'flex'} flexWrap={'wrap'}>
                                                Ціна апартаментів при
                                                <DiscountLabel type='successWithBackground' value={discountInfo['proposal_discount']} />
                                                &nbsp;знижки
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Dashboard discountInfo={discountInfo} viewType="column" disableBorder flatInfo={flatInfo} flatId={flatId} hideButton/>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </PopupLayout>
            </PopupWrapper>
        </Modal>
    )
}

DiscountRequestFail.propTypes = {
    discountInfo: PropTypes.shape({
        booking_deadline: PropTypes.any,
        booking_price: PropTypes.string,
        requested_discount: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        proposal_discount: PropTypes.any
    }),
    flatId: PropTypes.any,
    flatInfo: PropTypes.shape({
        price_uah: PropTypes.any,
        price_usd: PropTypes.any
    }),
    navigate: PropTypes.func,
    userData: PropTypes.shape({
        filter: PropTypes.func
    })
}
