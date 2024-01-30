import PropTypes from "prop-types"
import { Grid, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import InnerHTML from 'dangerously-set-html-content';

import PopupWrapper from '../components/layouts/PopupWrapper';
import PopupLayout from '../components/layouts/PopupLayout';
import InfoAboutApartment from '../components/InfoAboutApartment';
import ExplanationLabel from "../components/ExplanationLabel";
import BookingFaq from "../components/BookingFaq";
import Dashboard from "../components/Dashboard";
import StageDiscountRequestFillForm from "../components/forms/StageDiscountRequestFillForm";
import { getPayment, getPaymentWithoutDiscount } from "../api/api";
import { get, set } from "lodash";
import Loader from "../components/Loader";
import { useFlat } from "../contexts/FlatContext/useFlat";
import useConfig from "../hooks/useConfig";
import { useDiscount } from "../contexts/DiscountContext/useDiscount";
import { useParams } from "react-router-dom";
import DiscountLabel from "../components/DiscountLabel";
import DisabledDiscountView from "../components/layouts/DisabledDiscountView";

export default function BookingRequestFill({ 
    onMount,
    routes,
    flatId,
    navigate,
    setUserData,
    setLastVisitedPage = () => { },
    userData }){

    const { flatInfoWithDiscount, getFlatInfoWithDiscount } = useFlat();
    const { DISABLE_DISCOUNT } = useConfig();
    const { discountInfo } = useDiscount();

    const params = useParams();

    const [formHTML, setformHTML] = useState('');
    const [pending, setPending] = useState(false);

    const $scrollablePage = useRef(null);

    useEffect(() => {
        if (!discountInfo) return;
        if (DISABLE_DISCOUNT) return;
        getFlatInfoWithDiscount(discountInfo.flat_id);
    }, [discountInfo]);
    
    useEffect(() => {
        if (!DISABLE_DISCOUNT) return;
        getFlatInfoWithDiscount(params.flatId);
    }, []);

    useEffect(() => {
        onMount();
    }, []);

    useEffect(() => {
        if (formHTML) {
            
            setTimeout(() => {
                document.dispatchEvent(new Event('DOMContentLoaded'));
                if ($scrollablePage.current) {
                    $scrollablePage.current.scrollTo(0, 1000);
                }
                setPending(false);
            }, 2000);
        }
    }, [formHTML]);

    const onSubmitWithoutDiscountRequest = (vals) => {
        setPending(true);
        console.log(vals);
        getPaymentWithoutDiscount({
            ...vals,
            description: `Бронювання квартири ${flatInfoWithDiscount.flat_number}`,
            discount_value: flatInfoWithDiscount.discount_value || 0,
            flat_id: flatInfoWithDiscount.flat_id,
            result_url: window.location.origin+window.location.pathname
            +window.location.search
            +'#'
            +routes.stage_booking_request_response_success.replace(':flatId', flatInfoWithDiscount.flat_id)
            .replace(':orderId', ''), //Номер замовлення додається на стороні сервера
        })
            .then(res => {
                const form = get(res, 'data.form', false);
                if (form) {
                    setformHTML(form);
                } else {
                    setformHTML('Помилка при отриманні форми оплати');
                    setTimeout(() => {
                        setformHTML('');
                    }, 2000);
                }
            })
            .catch(err => {
                setPending(false);
            })
    }

    const onSubmit = (vals) => {
        setPending(true);
        getPayment({
            booking_price: discountInfo.booking_price,
            booking_currency: discountInfo.booking_currency,
            description: `Бронювання квартири ${flatInfoWithDiscount.flat_number}`,
            order_id: discountInfo.created_id,
            result_url: window.location.origin+window.location.pathname+window.location.search+'#'+routes.stage_booking_request_response_success.replace(':flatId', discountInfo.flat_id).replace(':orderId', discountInfo.created_id),
        })
            .then(res => {
                const form = get(res, 'data.form', false);
                if (form) {
                    setformHTML(form);
                } else {
                    setformHTML('Помилка при отриманні форми оплати');
                    setTimeout(() => {
                        setformHTML('');
                    }, 2000);
                }
            })
            .catch(err => {
                setPending(false);
            })
    }

    const submitFunction = DISABLE_DISCOUNT ? onSubmitWithoutDiscountRequest : onSubmit;

    const discountInfoFromFlatInfo = DISABLE_DISCOUNT ? flatInfoWithDiscount : discountInfo;

    return (
        <Modal
            open={true}
        >
            <PopupWrapper>
                {pending && <Loader/>}
                <InfoAboutApartment flatInfo={flatInfoWithDiscount} />
                <PopupLayout ref={$scrollablePage}>
                    
                    <Grid container spacing={1} display={'flex'}>
                        <DisabledDiscountView>
                            <Grid item lg={12} md={12} xl={12} xs={12} display={'flex'} flexDirection={'column'}>
                                <ExplanationLabel>
                                    <div className="text-style-1920-3-d-body-bold text-color-text-900">
                                        При бронюванні даних апартаментів вам буде надано знижку в розмірі&nbsp;
                                        <DiscountLabel type='successWithBackground' value={discountInfoFromFlatInfo.discount_range} />
                                    </div>
                                    
                                </ExplanationLabel>
                            </Grid>
                        </DisabledDiscountView>
                        <Grid item lg={6} md={12} xl={8} xs={12} display={'flex'}>
                            <BookingFaq 
                                booking_deadline={discountInfoFromFlatInfo['booking_deadline']} 
                                booking_price={discountInfoFromFlatInfo.booking_price}
                                goToRoute={() => {
                                    navigate(routes.about_booking.replace(':flatId', flatId));
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} xl={4} xs={12} >
                            <Dashboard 
                                flatId={flatId} 
                                flatInfo={flatInfoWithDiscount} 
                                discountInfo={discountInfoFromFlatInfo}  
                                discountValue={discountInfoFromFlatInfo.discount_range}
                                hideButton
                                priceRowColumnStyle
                            />
                        </Grid>
                        <Grid item xs={12} >

                            <ExplanationLabel 
                                hideIcon={true}
                                
                            >
                                <StageDiscountRequestFillForm
                                    formTitle={'Заповніть контактні дані, щоб забронювати апартаменти'}
                                    form={userData}
                                    setFormOnUnmount={setUserData}
                                    submitTitle={'ПЕРЕЙТИ ДО ОПЛАТИ БРОНЮВАННЯ АПАРТАМЕНТІВ ('+ discountInfoFromFlatInfo.booking_price +' '+ discountInfoFromFlatInfo.booking_currency +')'}
                                    onSubmit={submitFunction}
                                    hideSubmitButton={!!formHTML}
                                />
                            </ExplanationLabel>
                        </Grid>
                        <Grid item xs={12}>
                            {formHTML && <div onClick={() => {
                                    setLastVisitedPage(routes.stage_booking_request_response_success.replace(':flatId', flatId));
                            }}>
                                <InnerHTML html={formHTML} />
                            </div>}
                        </Grid>
                    </Grid>
                </PopupLayout>
            </PopupWrapper>
        </Modal>
    )
}
BookingRequestFill.propTypes = {
    discountInfo: PropTypes.any,
    flatId: PropTypes.any,
    flatInfo: PropTypes.any,
    navigate: PropTypes.any,
    onMount: PropTypes.func,
    routes: PropTypes.any,
    userData: PropTypes.any,
    setLastVisitedPage: PropTypes.func,
    setUserData: PropTypes.func,
}
