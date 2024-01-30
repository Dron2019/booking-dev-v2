import PropTypes from "prop-types"
import React from 'react';
import InfoAboutApartment from '../components/InfoAboutApartment';
import PopupWrapper from '../components/layouts/PopupWrapper';
import { Box, Divider, Grid, Modal } from '@mui/material';
import PopupLayout from '../components/layouts/PopupLayout';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import DiscountLabel from '../components/DiscountLabel';
import IconSuccess from '../assets/icons/icon-success';
import UserDataTable from "../components/UserDataTable";
import currency from "currency.js";
import useCurrencies from "../hooks/useCurrencies";
import ButtonLarge from "../components/buttons/ButtonLarge";
import BookingDeadlineFaq from "../components/BookingDeadlineFaq";
import BookingFaq from "../components/BookingFaq";
import Dashboard from "../components/Dashboard";
import IconInfo from "../assets/icons/icon-info";
import { useFlat } from "../contexts/FlatContext/useFlat";



export default function DiscountRequestSuccess({ flatId, navigate, discountInfo, userData = [] }) {

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
    ]

    return (
        <Modal
            open={true}
            onClose={() => navigate(routes.stage_discount_request_fill.replace(':flatId', flatId))}
        >
            <PopupWrapper>

                <InfoAboutApartment flatInfo={flatInfo} />
                <PopupLayout>
                    <Grid container spacing={2}>
                        <Grid item sx={12} lg={6}>
                            <Box className="MuiBox-black-border-large ">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container spacing={1} >
                                        <Grid item xs={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                            <IconSuccess style={{
                                                margin: 'auto'
                                            }}/>
                                        </Grid>
                                        <Grid item xs={9} textAlign={'left'} alignSelf={'center'} className="text-style-1920-3-d-h-1 text-color-input-success">
                                            Вітаємо!
                                        </Grid>
                                        <Grid item xs={3}>
                                            <DiscountLabel type='success' value={discountInfo['proposal_discount']} />
                                        </Grid>
                                        <Grid item xs={9} className="text-style-1920-3-d-h-2">
                                            Вам доступна знижка за цими апартаментами
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <p className="text-style-1920-3-d-body">
                                        <span className="text-style-1920-3-d-body-bold">
                                            Щоб отримати знижку
                                            <span className="text-color-text-attention"> виконайте бронювання на апартаменти </span>
                                        </span>
                                        і наш відділ продажів звʼяжеться з вами для уточнення деталей.
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <UserDataTable fields={userDataTableFieldsToRender} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to={routes.stage_booking_request_fill.replace(':flatId', flatId)}>
                                        <ButtonLarge>
                                            Перейти до бронювання апартаментів ({discountInfo.booking_price} {currencyList['UAH']})
                                        </ButtonLarge>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <BookingDeadlineFaq/>
                                </Grid>
                            </Grid>
                            </Box>
                        </Grid>
                        <Grid item sx={12} lg={6} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                        <BookingFaq goToRoute={() => {
                                            navigate(routes.about_booking.replace(':flatId', flatId));
                                        }}/>
                                </Grid> 
                                <Grid item xs={12}>
                                    <Box className="MuiBox-gray-border-large">
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item xs={'auto'} >
                                                <IconInfo/>
                                            </Grid>
                                            <Grid item xs={'auto'} className="text-style-1920-3-d-h-3  text-color-text-900">
                                                Ціна апартаментів при
                                            </Grid>
                                            <Grid item >
                                                <DiscountLabel type='successWithBackground' value={discountInfo['proposal_discount']} />
                                            </Grid>
                                            <Grid item className="text-style-1920-3-d-h-3  text-color-text-900">
                                                знижки
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
DiscountRequestSuccess.propTypes = {
    discountInfo: PropTypes.shape({
        flat_id: PropTypes.any,
        proposal_discount: PropTypes.number,
        booking_price: PropTypes.any,
    }),
    flatId: PropTypes.number,
    userData: PropTypes.array,
    flatInfo: PropTypes.object,
    navigate: PropTypes.func
}
