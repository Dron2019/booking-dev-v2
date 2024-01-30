import React, { useEffect, useRef, useState } from 'react';
import c3 from 'c3';
import { Box } from '@mui/material';
import { format, parse } from 'date-fns';
import { uniqueId } from 'lodash';
import { numberWithCommas } from '../helpers/helpers';
import DisabledDiscountView from './layouts/DisabledDiscountView';
import ButtonLarge from './buttons/ButtonLarge';
import { Link, useParams } from 'react-router-dom';
import { routes } from '../routes';

function getChart(data, id) {
    const reversedData = data.reverse();
    const chart = c3.generate({
        bindto: `#${id}`,
        data: {
            x: 'x',
            y: 'y',
    
            columns: [
                ['x', ...data.map(el => parse(el.date, 'yyyy-MM-dd HH:mm:ss', new Date()))],
                ['profit', ...data.map(el => el.price_usd)],
            ],
            types: {
                profit: 'area-spline',
            },
        },
        padding: {
            // left: 100,
            right: 50,
        },
        legend: {
            show: false,
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: function (x) {
                        return format(x, 'dd.MM.yyyy');
                    },
    
                    // values: ['2013-01-05', '2013-01-10'],
                    values: [...data.map(el => {
                        return parse(el.date, 'yyyy-MM-dd HH:mm:ss', new Date());
                    })],
                },
            },
            y: {
                tick: {
                    format: function (d) {
                        return numberWithCommas(d);
                    },
                    values: data.map(el => el.price_usd),
                },
            },
        },
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                var $$ = this, config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor;
                for (i = 0; i < d.length; i++) {
                    if (!(d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        // text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                        text = `<table class='${$$.CLASS.tooltip}'>${title || title === 0 ? "<tr><th colspan='2'>Ціна на " + title + "</th></tr>" : ""}`;
                    }

                    name = nameFormat(d[i].name);
                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td class='value'>" + numberWithCommas(value) + " $</td>";
                    text += "</tr>";
                    text += `
                        <tr class='"${$$.CLASS.tooltipName}-${d[i].id} "'>
                            <td class='value'>${numberWithCommas(reversedData[d[0].index].price_uah)} грн.</td>
                        </tr>
                    `;
                }
                return text + "</table>";
            },
        },
    });
    return chart;
}



export default function GraphicPriceHistory({ data = [], close = () => { }, flatId }) {

    const [chart, setChart] = useState(false);

    const id = uniqueId('chart-');
    const ref = useRef(null);

    useEffect(() => {
        const chaart = getChart(data, id);
        setChart(chaart);
        return chart.destroy;

    }, []);
    return (
            <div className='GraphicPriceHistory' onClick={(evt) => {
                evt.stopPropagation();
                if (evt.target.classList.contains('GraphicPriceHistory')) {
                    close();
                }
            }}>
                <Box className="GraphicPriceHistory__content">
                    <GraphicGradient/>
                    <div className="text-style-1920-3-d-h-3 text-color-text-900 GraphicPriceHistory__title">
                        Динаміка цін на апартаменти
                    </div>
                    <div className='GraphicPriceHistory__chart' id={id} ref={ref}></div>
                    <svg className="GraphicPriceHistory__close" onClick={close} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L8 6.58579L12.2929 2.29289C12.6834 1.90237 13.3166 1.90237 13.7071 2.29289C14.0976 2.68342 14.0976 3.31658 13.7071 3.70711L9.41421 8L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L8 9.41421L3.70711 13.7071C3.31658 14.0976 2.68342 14.0976 2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929L6.58579 8L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z" fill="#111111"/>
                    </svg>
                    <DisabledDiscountView>
                        <Link to={routes.stage_booking_request_fill.replace(':flatId', flatId)}>
                            <ButtonLarge onClick={close}>
                                ЗАБРОНЮВАТИ ОНЛАЙН ЗІ ЗНИЖКОЮ
                            </ButtonLarge>
                        </Link>
                    </DisabledDiscountView>
                </Box>
            </div>
    )
}

function GraphicGradient() {
    return (
        <svg width="591" height="224" viewBox="0 0 591 224" fill="none" className="none" style={{
            width: 0,
            height: 0,
        }}>
            <defs>
                <defs>
                <linearGradient id="chart-gradient" x1="568.5" y1="0" x2="568.5" y2="463" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7BAD3B"/>
                    <stop offset="1" stopColor="#7BAD3B" stopOpacity="0"/>
                </linearGradient>
                </defs>
            </defs>
    </svg>
    )
}