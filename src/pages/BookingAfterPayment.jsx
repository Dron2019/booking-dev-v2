import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Modal } from '@mui/material';
import { get, isEmpty } from 'lodash';
import InnerHTML from 'dangerously-set-html-content';
import { getPaymentWithoutDiscount, getStatusPayment } from '../api/api';
import useConfig from "../hooks/useConfig";
import { useFlat } from '../contexts/FlatContext/useFlat';
import Loader from "../components/Loader";
import PopupWrapper from '../components/layouts/PopupWrapper';
import InfoAboutApartment from '../components/InfoAboutApartment';
import PopupLayout from '../components/layouts/PopupLayout';
const SummaryDocumentLink = React.lazy(() => import("../components/pdf/SummaryDocumentLink"));
import IconSuccess from "../assets/icons/icon-success";
import ExplanationLabel from "../components/ExplanationLabel";
import IconInfo from "../assets/icons/icon-info";
import UserDataList from "../components/UserDataList";
import IconFail from "../assets/icons/IconFail";
import { routes } from "../routes";
import ButtonLarge from "../components/buttons/ButtonLarge";

const NEGATIVE_STATUSES = /not found|error/;
const POSITIVE_STATUSES = /success/;
export default function BookingAfterPayment({ flatId, onCloseLink }){

    const { flatInfoWithDiscount, getFlatInfoWithDiscount } = useFlat();
    const [ bookingResult, setBookingResult ] = useState({});

    const params = useParams();
    const config = useConfig();

    useEffect(() => {
        if (!bookingResult.flat_id) return;
        getFlatInfoWithDiscount(bookingResult.flat_id);
    }, [bookingResult]);

    useEffect(() => {
        const orderId = params.orderId;
        getStatusPayment(orderId)
            .then(res => {
                const result = get(res, 'data.data', false);
                if (result) {
                    setBookingResult(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Modal
            open={true}
        >
            <PopupWrapper>
                {isEmpty(bookingResult) && <Loader/>}
                <InfoAboutApartment flatInfo={flatInfoWithDiscount} />
                <PopupLayout>
                    {config.BOOKING_REUSULT_POSITIVE_STATUSES.includes(bookingResult.status) && 
                        <BookingAfterPaymentSuccess 
                            config={config} 
                            params={params} 
                            bookingResult={bookingResult} 
                        />}
                    {config.BOOKING_REUSULT_NEGATIVE_STATUSES.includes(bookingResult.status) && 
                        <BookingAfterPaymentError 
                            orderId={params.orderId} 
                            config={config} 
                            params={params} 
                            bookingResult={bookingResult} 
                        />
                    }
                    
                </PopupLayout>
            </PopupWrapper>
        </Modal>
    )
}

BookingAfterPayment.propTypes = {
    flatId: PropTypes.any,
    onCloseLink: PropTypes.any
}

BookingAfterPayment.defaultProps = {
    flatId: PropTypes.number,
    onCloseLink: PropTypes.func,
}


function BookingAfterPaymentSuccess({ params = {}, bookingResult = {}, config= {} }) {

    const { project_title } = config;

    const titles = {
        email: 'Електронна пошта',
        phone: 'Телефон',
        // second_name: 'Прізвище',
        last_name: 'Прізвище',
        name: 'Імʼя',
    }


    return (
        <Grid container spacing={1} display={'flex'}>
            <Grid item xs={12} xl={6}>
                <ExplanationLabel hideIcon>
                    <Grid container spacing={3} alignItems={'center'}>
                        <Grid item xs={2} md={'auto'}>
                            <IconSuccess />
                        </Grid>
                        <Grid item xs={10} md={true} className="text-style-1920-3-d-h-1 text-color-input-success">
                            Вітаємо
                        </Grid>
                        <Grid item xs={12} className="text-style-1920-3-d-body text-color-text-700">
                            <span className="text-style-1920-3-d-body-bold text-color-text-900">Раді повідомити, що Ваше бронювання квартири пройшло успішно!</span> Вибране житло тепер зарезервоване для вас. Найближчим часом з вами звʼяжуться наші менеджери для уточнення деталей замовлення!
                        </Grid>
                        <Grid item xs={12} className="text-style-1920-3-d-h-3 text-color-text-900" marginBottom={-3}>
                            Номер вашого замовлення: 
                        </Grid>
                        {bookingResult.liqpay_order_id && <Grid item xs={12} className="text-style-1920-3-d-h-3 text-color-accent-secondary-900">
                            {bookingResult.liqpay_order_id}
                        </Grid>}
                        <Grid item xs={12} display={'flex'}>
                            {<React.Suspense fallback={<Loader/>}>
                                <SummaryDocumentLink  bookingResult={bookingResult} project_title={project_title}/>
                            </React.Suspense>}
                        </Grid>
                    </Grid>
                </ExplanationLabel>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Box className="MuiBox-gray-border-large ">
                    <Grid container spacing={1}>
                        <Grid item xs={2} md={1}>
                            <IconInfo/>
                        </Grid>
                        <Grid item xs={10} md={11} className="text-style-1920-3-d-h-3">
                                Дані користувача: 
                        </Grid>
                        <Grid item xs={2} md={1}></Grid>
                        <Grid item xs={10} md={11}>
                            <UserDataList
                                sort
                                fields={Object.entries(bookingResult).filter(([key, value]) => {
                                    return /email|phone|last_name|^name/.test(key);
                                }).reduce((acc, [key, value]) => {
                                    console.log(key, value);
                                    if (!key) return acc;
                                    acc.push({
                                        label: titles[key],
                                        value: value,
                                    });
                                    return acc;
                                }, [])}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            {/* <Grid item xs={12} display={'flex'}>
                {!isEmpty(bookingResult) && 
                    <PDFViewer>
                        <SummaryDocument bookingResult={bookingResult} />
                    </PDFViewer>
                }
            </Grid> */}


        </Grid>
    )
}

function BookingAfterPaymentError({ config = {}, bookingResult = {}, orderId }) {

    const { manager } = config;

    const [ paymentButton, setPaymentButton ] = useState(undefined);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (paymentButton) {
            setTimeout(() => {
                document.dispatchEvent(new Event('DOMContentLoaded'));
                setPending(false);
            }, 2000);
        }
    }, [paymentButton]);

    const repeatPayment = () => {
        setPending(true);
        getPaymentWithoutDiscount({
            agreement: true,
            email:bookingResult.email,
            name: bookingResult.name,
            offerta:true,
            phone: bookingResult.phone,
            surname: bookingResult.last_name,
            description: bookingResult.description,
            // discount_value: flatInfoWithDiscount.discount_value || 0,
            flat_id: bookingResult.flat_id,
            order_id: orderId,
            result_url: window.location.origin+window.location.pathname
            +window.location.search
            +'#'
            +routes.stage_booking_request_response_success.replace(':flatId', bookingResult.flat_id)
            .replace(':orderId', ''), //Номер замовлення додається на стороні сервера
        })
            .then(res => {
                const form = get(res, 'data.form', false);
                if (form) {
                    setPaymentButton(form);
                } else {
                    setPaymentButton('Помилка при отриманні форми оплати');
                    setTimeout(() => {
                        setPaymentButton('');
                    }, 2000);
                }
            })
            .catch(err => {
                setPending(false);
            })
    }

    return (
        <ExplanationLabel hideIcon>
            {pending && <Loader/>}
            <Grid container spacing={1} display={'flex'} alignItems={'center'}>
                <Grid item xs={'auto'}>
                    <IconFail/>
                </Grid>
                <Grid item xs={true} className="text-style-1920-3-d-h-1 text-color-fail-900">
                    Упс...
                </Grid>
                <Grid item xs={12} className="text-style-1920-3-d-h-2">
                    Сталася помилка при оплаті
                </Grid>
                {bookingResult.liqpay_order_id && <Grid item xs={12} className="text-style-1920-3-d-body">
                    <div>Ім&apos;я: {bookingResult.name}</div>
                    <div>Телефон: {bookingResult.phone}</div>
                    <div>Email: {bookingResult.email}</div>
                    <div>Номер бронювання: {orderId}</div>
                    <div>Номер оплати: {bookingResult.liqpay_order_id}</div>
                </Grid>
                }
                <Grid item xs={12} className="text-style-1920-3-d-h-3">
                    Зверніться до менеджера:
                </Grid>
                <Grid item xs={'auto'} className="text-style-1920-3-d-h-3">
                    <span>{manager.name}</span>
                </Grid>
                <Grid item xs={true} className="text-style-1920-3-d-h-3">
                    <a className="text-color-accent-secondary-900" href={"tel:"+manager.phone}>{manager.phone}</a>
                </Grid>
                {!paymentButton && <Grid item xs={12} className="text-style-1920-3-d-h-3">
                    <ButtonLarge onClick={repeatPayment}>Спробувати ще раз</ButtonLarge>
                </Grid>}
                {paymentButton && <Grid item xs={true} className="text-style-1920-3-d-h-3">
                    <InnerHTML html={paymentButton} />
                </Grid>}
            </Grid>
        </ExplanationLabel>
    )
}
