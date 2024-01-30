import PropTypes from "prop-types"
import React from 'react';
import PopupLayout from '../components/layouts/PopupLayout';
import PopupWrapper from '../components/layouts/PopupWrapper';
import ButtonLarge from '../components/buttons/ButtonLarge';
import { Grid, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from "../routes";
import { clearData, getSavedData } from "../hooks/useLocalSavedData";
import { useFlat } from "../contexts/FlatContext/useFlat";
 
export default function DiscountRequestRepeatDialog({
    setUserData,
    setDiscountInfo,
    setLastVisitedPage,
    flatId
}){

    const navigate = useNavigate();
    
    const agree = () => {
        const { userData, discountInfo } = getSavedData();
        setUserData(userData);
        setDiscountInfo(discountInfo);

        const nextPage = routes.stage_booking_request_fill.replace(':flatId', flatId);
        navigate(nextPage);
        setLastVisitedPage(nextPage);

    }
    
    const disagree = () => {
        clearData();

        const nextPage = routes.stage_discount_request_fill.replace(':flatId', flatId);
        navigate(nextPage);
        setLastVisitedPage(nextPage);
    };


    return (
        <Modal open={true}>
            <PopupWrapper>
                <PopupLayout style={{
                    height: 'auto',
                    flexGrow: 0,
                    alignSelf: 'center',
                    margin: 'auto',
                    borderRadius: '20px',
                    position: 'relative',
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="text-color-text-900 text-style-1920-3-d-h-3">
                            З вашого пристрою вже був відправлений запит на знижку, бажаєте продовжити бронювання?
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ButtonLarge onClick={agree}>
                                Так, продовжити
                            </ButtonLarge>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ButtonLarge onClick={disagree}>
                                ХОЧУ ОТРИМАТИ ЗНИЖКУ НА ЦІ АПАРТАМЕНТИ
                            </ButtonLarge>
                        </Grid>
                    </Grid>
                </PopupLayout>
            </PopupWrapper>
        </Modal>
    )
}
DiscountRequestRepeatDialog.propTypes = {
    setDiscountInfo: PropTypes.func,
    setLastVisitedPage: PropTypes.func,
    flatId: PropTypes.string,
    setUserData: PropTypes.func
}
