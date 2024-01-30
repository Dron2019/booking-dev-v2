import PropTypes from "prop-types"
import React from 'react';
import Dashboard from '../components/Dashboard';
import DiscountChooser from '../components/DiscountChooser';
import ExplanationLabel from '../components/ExplanationLabel';
import PopupLayout from '../components/layouts/PopupLayout';
import InfoAboutApartment from '../components/InfoAboutApartment';
import PopupWrapper from '../components/layouts/PopupWrapper';
import { Grid, Modal } from '@mui/material';
import StageDiscountRequestFillForm from '../components/forms/StageDiscountRequestFillForm';
import { useParams } from 'react-router-dom';
import useCurrencies from '../hooks/useCurrencies';
import { useFlat } from "../contexts/FlatContext/useFlat";
import { useDiscount } from "../contexts/DiscountContext/useDiscount";
import useConfig from "../hooks/useConfig";
import { isArray } from "lodash";

export default function DiscountRequestFilling({ setUserData, discountInfo, flatId, navigate, userData, routes, requestDiscount }) {

    const { DISABLE_DISCOUNT } = useConfig();
    const params = useParams();

    if (DISABLE_DISCOUNT) navigate(routes.stage_booking_request_fill.replace(':flatId', params.flatId));

    // console.log(DISABLE_DISCOUNT, 'DISABLE_DISCOUNT');

    const currencies = useCurrencies();

    const { setRequestedDiscount } = useDiscount();

    const { flatInfo } = useFlat(); 

    return (
        <Modal
            open={true}
            onClose={() => navigate(routes.stage_flat.replace(':flatId', flatId))}
        >
            <PopupWrapper>
                <InfoAboutApartment flatInfo={flatInfo} />
                <PopupLayout>
                    <Grid container spacing={1} alignItems={'center'} display={'flex'}>
                        <Grid item lg={6} xl={4.5} xs={12} className="text-style-1920-3-d-h-3 text-color-text-900" textAlign={'center'}>
                            Отримати знижку на апартаменти
                        </Grid>
                        <Grid item lg={6} xl={7.5} xs={12}>
                            <ExplanationLabel>
                                <div className="text-style-1920-3-d-body text-color-text-700">
                                    Зверніть увагу,
                                    <span className='text-style-1920-3-d-body-bold text-color-text-900'>що чим більший відсоток знижки, тим менше шанс на її отримання. </span>
                                    Ви маєте лише 
                                    <span className='text-style-1920-3-d-body-bold text-color-text-900'>одну спробу</span> 
                                    для отримання знижки.
                                    Для отримання знижки 
                                    <span className='text-style-1920-3-d-body-bold text-color-text-900'>оберіть її бажаний відсоток на шкалі нижче. </span>
                                </div>
                            </ExplanationLabel>
                        </Grid>
                        <Grid item  lg={6} xl={4.5} md={12} xs={12} alignSelf={'flex-start'}>
                            <Dashboard flatInfo={flatInfo} flatId={flatId} />
                        </Grid>
                        <Grid item lg={6} xl={7.5} xs={12} alignSelf={'flex-start'}>
                            <DiscountChooser
                                discountValues={isArray(flatInfo.discount_range) ? flatInfo.discount_range : [ 1,2,3,4,5 ]}
                                price_usd={flatInfo.price_usd}
                                currencies={currencies}
                                price_uah={flatInfo.price_uah}
                                setDiscount={setRequestedDiscount}
                                discountValue={discountInfo?.requested_discount}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ExplanationLabel hideIcon={true}>
                                <StageDiscountRequestFillForm
                                    formTitle="Заповніть контактні дані для спроби на отримання знижки"
                                    submitTitle="ПЕРЕВІРИТИ МОЖЛИВІСТЬ ЗНИЖКИ"
                                    form={userData}
                                    setFormOnUnmount={setUserData}
                                    onSubmit={requestDiscount}
                                />
                            </ExplanationLabel>
                        </Grid>
                    </Grid>
                </PopupLayout>
            </PopupWrapper>
        </Modal>
    )
}
DiscountRequestFilling.propTypes = {
    discountInfo: PropTypes.shape({
        requested_discount: PropTypes.any
    }),
    flatId: PropTypes.number,
    flatInfo: PropTypes.shape({
        discount_range: PropTypes.any,
        price_uah: PropTypes.any,
        price_usd: PropTypes.any
    }),
    navigate: PropTypes.func,
    requestDiscount: PropTypes.number,
    routes: PropTypes.shape({
        stage_flat: PropTypes.shape({
        replace: PropTypes.func
        })
    }),
    setRequestedDiscount: PropTypes.func,
    setUserData: PropTypes.func,
    userData: PropTypes.func
}
