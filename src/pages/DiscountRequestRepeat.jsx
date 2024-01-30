import PropTypes from "prop-types"
import React, { useEffect, useState } from 'react';
import { Box, Grid, Modal } from '@mui/material';
import PopupWrapper from '../components/layouts/PopupWrapper';
import InfoAboutApartment from '../components/InfoAboutApartment';
import PopupLayout from '../components/layouts/PopupLayout';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import ButtonLarge from '../components/buttons/ButtonLarge';
import UserDataTable from '../components/UserDataTable';
import Dashboard from '../components/Dashboard';

import EmojiNegativeIcon from '../assets/icons/emoji-negative.jsx';
import BookingFaq from "../components/BookingFaq.jsx";
import currency from "currency.js";
import useCurrencies from "../hooks/useCurrencies.jsx";
import DiscountLabel from "../components/DiscountLabel";
import BookingDeadlineFaq from "../components/BookingDeadlineFaq.jsx";
import { useFlat } from "../contexts/FlatContext/useFlat.jsx";
import { get, set } from "lodash";



const topRowsSizes = {
    small: {
        xs: 2.5,
        md: 2.4
    },
    large: {
        xs: 9.5,
        md: 9.6
    }
}


export default function DiscountRequestRepeat({  flatId, navigate, discountInfo, userData = [] }) {


    const { flatInfo, getFlatInfoWithDiscount, flatInfoWithDiscount, clearRequestedFlatInfoWithDiscount } = useFlat();

    const currencyList = useCurrencies();

    useEffect(() => {
        const requestedFlatIdDiscount = get(discountInfo, 'flat_id', null);
        if (!requestedFlatIdDiscount) {
            return clearRequestedFlatInfoWithDiscount(undefined);
        }
        getFlatInfoWithDiscount(requestedFlatIdDiscount);
    }, [discountInfo]);

    if (!discountInfo) return null;

    const userDataTableFieldsToRender = flatInfoWithDiscount ? [
        ...userData.filter(field => /text|email|phone/.test(field.type)),
        {
            label: 'Очікувана сума вигоди: ',
            value: <>
                <div>{currency(flatInfoWithDiscount.price_usd).multiply(+discountInfo.proposal_discount / 100).value} {currencyList['USD']}</div>
                <div>{currency(flatInfoWithDiscount.price_uah).multiply(+discountInfo.proposal_discount / 100).value} {currencyList['UAH']}</div>
            </>
        }
    ] : [
        ...userData.filter(field => /text|email|phone/.test(field.type)),
    ]

    return (
        <Modal
            open={true}
        >
            <PopupWrapper>

                <InfoAboutApartment flatInfo={flatInfoWithDiscount} />
                <PopupLayout>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <Box  className="MuiBox-black-border-large">
                                <Grid container spacing={2} alignItems={'flexStart'}>
                                    <Grid item {...topRowsSizes['small']} alignItems={'center'} justifyContent={'center'} display={'flex'}>
                                        <EmojiNegativeIcon/>
                                    </Grid>
                                    <Grid item {...topRowsSizes['large']} className="text-style-1920-3-d-h-1 text-color-fail-900" alignSelf={'center'}>
                                        Упс...
                                    </Grid>
                                    <Grid item xs={12} className="text-style-1920-3-d-h-2 text-color-text-900">
                                        За цим номером телефону вже була спроба отримання знижки
                                    </Grid>
                                    <Grid item {...topRowsSizes['small']}>
                                        <DiscountLabel value={discountInfo.proposal_discount} type="proposal"/>
                                    </Grid>
                                    <Grid item {...topRowsSizes['large']}  className="text-style-1920-3-d-body text-color-text-700">
                                        По приміщенню 
                                            {flatInfoWithDiscount && 
                                                <span className="text-style-1920-3-d-body-bold text-color-text-900">
                                                    &nbsp;{flatInfoWithDiscount.flat_number}&nbsp;
                                                </span>
                                            }
                                        вам було запропоновано {discountInfo.proposal_discount}% знижки.
                                        <div className="text-style-1920-3-d-body-bold text-color-text-900">Якщо вам це підходить, просимо забронювати апартаменти! </div>
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
                        <Grid item xs={12} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <BookingFaq booking_deadline={flatInfo['booking_deadline']} booking_price={discountInfo.booking_price + currencyList[discountInfo.booking_currency]}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className="MuiBox-gray-border-large">
                                        <Dashboard 
                                            viewType="column" 
                                            discountInfo={discountInfo} 
                                            hideButton 
                                            disableBorder={true} 
                                            flatInfo={flatInfoWithDiscount} 
                                            flatId={flatId} 
                                        />
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
DiscountRequestRepeat.propTypes = {
    discountInfo: PropTypes.shape({
        booking_price: PropTypes.any,
        proposal_discount: PropTypes.any,
        booking_currency: PropTypes.string
    }),
    flatId: PropTypes.any,
    flatInfo: PropTypes.any,
    navigate: PropTypes.any,
    userData: PropTypes.array
}
