import PropTypes from "prop-types"
import React from 'react';
import ExplanationLabel from './ExplanationLabel';
 
export default function BookingFaq({ booking_price, booking_deadline, goToRoute = () => { } }){
    return (
        <ExplanationLabel onIconClick={goToRoute}>
            <div className="text-style-1920-3-d-h-3 text-color-text-900">
                Що таке бронювання апартаментів?
            </div>
            <p className="text-style-1920-3-d-body text-color-text-700">
                Під бронюванням апартаментів мається на увазі закріплення апартаментів за вами або даними людини, на яку ви оформите заявку.
            </p>
            <p className="text-style-1920-3-d-body">
                Сума апартаментів на момент бронювання
                <span className="text-style-1920-3-d-body-bold text-color-text-900"> зберігається до закінчення вашої броні. </span>
                Тривалість броні
                <span className="text-style-1920-3-d-body-bold text-color-text-900"> {booking_deadline} </span>
                годин.
                Щоб забронювати апартаменти оплатіть бронь.
                <span className="text-style-1920-3-d-body-bold text-color-text-900">Сума броні складає {booking_price} UAH</span>
            </p>
        </ExplanationLabel>
    )
}
BookingFaq.propTypes = {
    booking_deadline: PropTypes.any,
    booking_price: PropTypes.any
}
