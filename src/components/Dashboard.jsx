// Desc: Dashboard component
import React from "react"
import PropTypes from "prop-types"
import ButtonQuestion from "./buttons/ButtonQuestion";
import ButtonLarge from "./buttons/ButtonLarge";
import { Link, useMatch } from "react-router-dom";
import { routes } from "../routes";
import PriceHistory from "./PriceHistory";
import useCurrencies from "../hooks/useCurrencies";
import { numberWithCommas } from "../helpers/helpers";
import { Tooltip } from "@mui/material";
import currency from "currency.js";
import useConfig from "../hooks/useConfig";
import { get } from "lodash";
import AnnualIncomesLabel from "./AnnualIncomesLabel";
import EnabledDiscountView from "./layouts/EnabledDiscountView";
import DisabledDiscountView from "./layouts/DisabledDiscountView";

/**
 * Dashboard component displays information about an apartment.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.flatId - The ID of the apartment.
 * @param {Object} props.flatInfo - Information about the apartment.s
 * @param {boolean} props.disableBorder - Whether to disable the border around the dashboard.
 * @param {string} props.lastVisitedPage - The last visited page.
 * @param {string} props.viewType - View Type
 * @param {boolean} props.hideButton - Whether to hide the button.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard({ discountValue, viewType = '', flatId, flatInfo = {}, disableBorder, lastVisitedPage, hideButton, priceRowColumnStyle }){

    const currecies = useCurrencies(); 
    const { statuses, year_annual_income_percent, DISABLE_DISCOUNT } = useConfig();
    const cn = ['ob_dashboard'];
    if (viewType === 'column') cn.push('ob_dashboard--column');
    if (disableBorder) cn.push('ob_dashboard--no-border');


    const flatStatusFromConfig = get(statuses, flatInfo.status, null);

    const match = useMatch(routes.stage_discount_request_fill);

    return (
        <div className={cn.join(' ')}>
            <table className="ob_dashboard__price-block">
                <tr>
                    {
                        discountValue ? 
                        <DashboardTopRowWithDiscount
                            price_usd={flatInfo.price_usd}
                            price_uah={flatInfo.price_uah}
                            discountValue={discountValue}
                            currecies={currecies}
                            priceRowColumnStyle
                        />
                        : <DashboardTopRowPlain
                            price_usd={flatInfo.price_usd}
                            price_uah={flatInfo.price_uah}
                            currecies={currecies}
                        />
                    }
                    
                </tr>
                <tr>
                    <td style={{
                        backgroundColor: "#F2DD77"
                    }}>
                        <div className="text-style-1920-3-d-small">
                            {currecies['USD']} за м²
                        </div>
                        <div className="text-style-1920-3-d-body-bold">
                            {numberWithCommas(flatInfo.price_m2_usd)}
                        </div>
                    </td>
                    <td style={{
                        backgroundColor: "#F2DD77"
                    }}>
                        <div className="text-style-1920-3-d-small">
                            {currecies['UAH']} за м²
                        </div>
                        <div className="text-style-1920-3-d-body-bold">
                            {numberWithCommas(flatInfo.price_m2_uah)}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td  style={{
                        backgroundColor: "#FDF3C2"
                    }} colSpan={2} >
                            <div className="ob_dashboard__price-block-bottom-row">
                                <div className="text-style-1920-3-d-super-tiny">
                                    Курс долара на сьогодні
                                </div>
                                <div className="text-style-1920-3-d-small">{flatInfo.exchange_rate} грн.</div>
                            </div>
                    </td>
                </tr>
            </table>
            <div className="ob_dashboard__status-block">
                <div className="ob_dashboard__status-block-row ob_dashboard__status-block-row--column">
                    <div className="text-style-1920-3-d-small">
                        Статус:
                    </div>
                    {
                        flatStatusFromConfig && <div className="ob_status-label" style={{
                            backgroundColor:  flatStatusFromConfig.color
                        }}>
                            <span>{flatStatusFromConfig.text}</span>
                            {
                                flatStatusFromConfig.aviable && <Tooltip 
                                    enterTouchDelay={0}
                                    title={<>
                                        <div>НАЯВНІСТЬ У СИСТЕМІ НА СЬОГОДНІ ПЕРЕВІРЕНО!</div>
                                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.31953 10.0653V18H14.6805V10.0653H16.5199C16.6977 10.0653 16.7871 9.85069 16.6619 9.72447L15.4896 8.54263L9.14199 2.14316C9.06376 2.06428 8.93624 2.06428 8.858 2.14316L1.33808 9.72447C1.21288 9.8507 1.30229 10.0653 1.48008 10.0653H3.31953Z" stroke="#F1F4F9" strokeWidth="1.5"/>
                                            <path d="M6 11.6L8.25 14L12 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </>}>
                                    <div><ButtonQuestion/></div>
                                </Tooltip>
                            }
                            
                        </div>
                    }
                </div>
                <div className="ob_dashboard__status-block-row">
                    <div className="text-style-1920-3-d-small">
                        Номер апартаменту:
                    </div>
                    <div className="text-style-1920-3-d-body-bold">
                        {flatInfo.flat_number}
                    </div>
                </div>
                <div className="ob_dashboard__status-block-row">
                    <div className="text-style-1920-3-d-small">
                        Загальна площа:&nbsp; 
                    </div>
                    <div className="text-style-1920-3-d-body-bold">
                        {flatInfo.all_area} м²
                    </div>
                </div>

            </div>
            {flatInfo.price_history && <PriceHistory currecies={currecies} price_history={flatInfo.price_history} flatId={flatId}/>}
            <AnnualIncomesLabel 
                value={numberWithCommas(flatInfo.price_usd * year_annual_income_percent)} 
                currencyLabel={currecies['USD']}
                button={<Link to={routes.stage_discount_request_fill.replace(':flatId', flatId)}>
                    <ButtonLarge>
                        {DISABLE_DISCOUNT ? 'ПЕРЕЙТИ ДО БРОНЮВАННЯ' : 'ХОЧУ ОТРИМАТИ ЗНИЖКУ НА ЦІ АПАРТАМЕНТИ'}
                    </ButtonLarge>
                </Link>}
            />
            <EnabledDiscountView>
                {!hideButton && match === null && !lastVisitedPage && <Link to={routes.stage_discount_request_fill.replace(':flatId', flatId)}>
                    <ButtonLarge>
                        ХОЧУ ОТРИМАТИ ЗНИЖКУ НА ЦІ АПАРТАМЕНТИ
                    </ButtonLarge>
                </Link>}
                {!hideButton && lastVisitedPage && <Link to={lastVisitedPage}>
                    <ButtonLarge>
                        ХОЧУ ОТРИМАТИ ЗНИЖКУ НА ЦІ АПАРТАМЕНТИ
                    </ButtonLarge>
                </Link>}
            </EnabledDiscountView>
            <DisabledDiscountView>
                {!hideButton && <Link to={routes.stage_booking_request_fill.replace(':flatId', flatId)}>
                    <ButtonLarge>
                        ЗАБРОНЮВАТИ ОНЛАЙН ЗІ ЗНИЖКОЮ
                    </ButtonLarge>
                </Link>}
            </DisabledDiscountView>
        
        </div>
    )
}
Dashboard.propTypes = {
    flatId: PropTypes.any,
    flatInfo: PropTypes.shape({
        price_ua: PropTypes.string,
        price_us: PropTypes.string
    }),
    viewType: PropTypes.oneOf(['column', '']),
    disableBorder: PropTypes.bool,
    hideButton: PropTypes.bool,
    discountValue: PropTypes.any,
    lastVisitedPage: PropTypes.string
}



function DashboardTopRowPlain({
    price_usd,
    price_uah,
    currecies
}) {

    return (
        <td colSpan={2}>
            <div className="ob_dashboard__price-block-top-row">
                <div className="text-style-1920-3-d-small">
                    Ціна апартаменту
                </div>
                <div className="text-style-1920-3-d-h-2">
                    {numberWithCommas(price_usd)} $
                </div>
                <div className="text-style-1920-3-d-body-bold">
                    {numberWithCommas(price_uah)} {currecies['UAH']}
                    <Tooltip enterTouchDelay={0} title="За умови повної оплати" arrow={true} placement="top"
                    >
                        <div>
                            <ButtonQuestion/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </td>
    )
}
DashboardTopRowPlain.propTypes = {
    currecies: PropTypes.object,
    price_uah: PropTypes.any,
    price_usd: PropTypes.any
}


function DashboardTopRowWithDiscount({
    price_usd,
    price_uah,
    currecies,
    discountValue = 0,
    priceRowColumnStyle
}) {

    const priceUsdWithDiscount = currency(price_usd).add(price_usd * discountValue / 100 * -1).value;
    const priceUahWithDiscount = currency(price_uah).add(price_uah * discountValue / 100 * -1).value;

    return (
        <>
            <td colSpan={priceRowColumnStyle ? 2 : 1}>
                <div className="ob_dashboard__price-block-top-row">
                    <div className="text-style-1920-3-d-small-old-price text-color-text-700">
                        {numberWithCommas(price_usd)} $
                    </div>
                    <div className="text-style-1920-3-d-h-2">
                        {numberWithCommas(priceUsdWithDiscount)} $
                    </div>
                </div>
                {priceRowColumnStyle && <div className="ob_dashboard__price-block-top-row">
                    <div className="text-style-1920-3-d-small-old-price text-color-text-700" style={{
                        marginTop: '0.5rem'
                    }}>
                        {numberWithCommas(price_uah)} {currecies['UAH']}
                    </div>
                    <div className="text-style-1920-3-d-body-bold">
                        {numberWithCommas(priceUahWithDiscount)} {currecies['UAH']}
                        <Tooltip title="За умови повної оплати" arrow={true} placement="top"
                        >
                            <span>
                                <ButtonQuestion/>
                            </span>
                        </Tooltip>
                    </div>
                </div>}
            </td>
            {!priceRowColumnStyle && <td>
                <div className="ob_dashboard__price-block-top-row">
                    <div className="text-style-1920-3-d-small-old-price text-color-text-700">
                        {numberWithCommas(price_uah)} {currecies['UAH']}
                    </div>
                    <div className="text-style-1920-3-d-body-bold">
                        {numberWithCommas(priceUahWithDiscount)} {currecies['UAH']}
                        <Tooltip title="За умови повної оплати" arrow={true} placement="top"
                        >
                            <span>
                                <ButtonQuestion/>
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </td>}
        </>
    )

}
DashboardTopRowWithDiscount.propTypes = {
    currecies: PropTypes.any,
    discountValue: PropTypes.number,
    price_uah: PropTypes.any,
    price_usd: PropTypes.any,
    priceRowColumnStyle: PropTypes.bool

}
