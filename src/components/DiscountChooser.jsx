import React, { useEffect } from 'react';
import PropTypes from "prop-types"
import DiscountChooseItem from './DiscountChooseItem';
import { Box, Grid } from '@mui/material';
import currency from 'currency.js';
import { numberWithCommas } from '../helpers/helpers';

const discountValuesOptions = [
    { textColor: "#ffffff", color: "#9DC62E", chanceText: "НАЙВИЩИЙ" },
    { textColor: "#ffffff", color: "#9DC62E", chanceText: "ВИСОКИЙ" },
    { textColor: "#ffffff", color: "#EEC846", chanceText: "СЕРЕДНІЙ" },
    { textColor: "#ffffff", color: "#E88A55", chanceText: "НИЗЬКИЙ" },
    { textColor: "#ffffff", color: "#CE4941", chanceText: "НАЙНИЖЧИЙ" },
];


export default function DiscountChooser({ currencies = {}, discountValues = [], price_usd, price_uah, setDiscount, discountValue = 0 }) {

    const b = currency(price_uah).multiply(discountValue / 100);


    const discountUah = currency(price_uah).multiply(discountValue / 100).value;
    const discountUsd = currency(price_usd).multiply(discountValue / 100).value;

    const priceUahWithDiscount = currency(price_uah).subtract(discountUah).value;
    const priceUsdWithDiscount = currency(price_usd).subtract(discountUsd).value;

    useEffect(() => {
        return () => {
            setDiscount(0);
        }
    }, []);

    return (
        <>
            <Box className="DiscountChooser MuiBox-black-border-large">
                <Grid container spacing={1}>
                    <Grid item xs={12} className="text-style-1920-3-d-h-3 color-black text-color-text-900">
                        Оберіть бажаний відсоток знижки
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0}>
                            {discountValues.map((item, index) => {
                                const indexOfStyleProperties = Math.min(index, discountValuesOptions.length - 1);
                                return (
                                    <Grid key={index} item xl={2.4} lg={6} xs={6}>
                                        <DiscountChooseItem
                                            onClick={() => setDiscount(item)}
                                            active={discountValue === item}
                                            value={item} 
                                            chanceText={discountValuesOptions[indexOfStyleProperties].chanceText}
                                            textColor={discountValuesOptions[indexOfStyleProperties].textColor} 
                                            color={discountValuesOptions[indexOfStyleProperties].color} 
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            className="MuiBox-black-border"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className="color-gray-4 DiscountChooser__part DiscountChooser__part-with-border">
                                    <div className="text-style-1920-body text-color-text-800">Очікувана сума вигоди:</div>
                                    <div className='text-style-1920-3-d-h-2 color-black'>{numberWithCommas(discountUsd)} {currencies['USD']}</div>
                                    <div className='text-style-1920-body-bold color-black'>{numberWithCommas(discountUah)} {currencies['UAH']}</div>
                                </Grid>
                                <Grid item xs={12} md={6} className="color-gray-4 DiscountChooser__part">
                                    <div className="text-style-1920-3-d-body text-color-text-800">Сума зі знижкою:</div>
                                    <div className='DiscountChooser__price-row'>
                                        <span style={{ textDecoration: 'line-through' }} className='text-color-text-700 text-style-1920-3-d-small-old-price'>{numberWithCommas(price_usd)} {currencies['USD']}</span>
                                        <span className='text-style-1920-3-d-h-2 color-black'>{numberWithCommas(priceUsdWithDiscount)} {currencies['USD']}</span>
                                    </div>
                                    <div className='DiscountChooser__price-row'>
                                        <span style={{ textDecoration: 'line-through' }} className='text-color-text-700 text-style-1920-3-d-small-old-price'>{numberWithCommas(price_uah)} {currencies['UAH']}</span>
                                        <span className='text-style-1920-3-d-body color-black'>{numberWithCommas(priceUahWithDiscount)} {currencies['UAH']}</span>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

DiscountChooser.propTypes = {
    discountValues: PropTypes.arrayOf(PropTypes.number),
    price_uah: PropTypes.string,
    price_usd: PropTypes.string,
    setDiscount: PropTypes.func
}
