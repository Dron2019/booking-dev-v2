import PropTypes from "prop-types"
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useMediaQuery } from "@mui/material";

const rowValues = [
    {
        title: "Номер:",
        key: 'flat_number'
    },
    {
        title: "Будинок:",
        key: "build",
    },
    {
        title: "Кімнат:",
        key: "rooms",
    },
    {
        title: "Поверх:",
        key: "floor",
    },
    {
        title: "Загальна площа",
        key: "all_area",
        slug: "м²",
    },
    {
        title: "Житлова площа",
        key: "life_area",
        slug: "м²",
    },
]

export default function InfoAboutApartment({ flatInfo = {} }){


    const smallScreen = useMediaQuery('(max-width:1360px)');

    return (
        <>
            {smallScreen && <div  className='InfoAboutApartment'>
                <div className="InfoAboutApartment__border">
                    <Accordion style={{
                        padding: 0,
                        border: 'none',
                        boxShadow: 'none',
                        alignItems: 'flex-start',
                    }}>
                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                            expandIcon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.3536 10.9396C17.9631 10.5491 17.3299 10.5491 16.9394 10.9396L11.9996 15.8792L7.05973 10.9396C6.6692 10.5491 6.03603 10.5491 5.64551 10.9396C5.255 11.3302 5.25501 11.9633 5.64554 12.3538L11.2925 18.0006L11.9996 18.7076L12.7067 18.0006L18.3536 12.3538C18.7441 11.9633 18.7441 11.3302 18.3536 10.9396Z" fill="#111111"/>
                                </svg>
                            }
                        >
                            <div className="text-style-1920-3-d-h-3">
                                Параметри апартаменту на бронювання
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                        
                            <img src={flatInfo.img_big}></img>
                            {
                                rowValues.map(({ title, key, slug = '' }) => (
                                    <InfoAboutApartmentRow
                                        key={key}
                                        title={title}
                                        value={(flatInfo[key] || '') +' '+slug}
                                    />
                                )
                                )
                            }
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>}
            {!smallScreen && <div className='InfoAboutApartment'>
                <div className="InfoAboutApartment__border">

                    <div className="text-style-1920-3-d-h-3">
                        Параметри апартаменту на бронювання
                    </div>
                    <img src={flatInfo.img_big}></img>
                    {
                        rowValues.map(({ title, key, slug = '' }) => (
                            <InfoAboutApartmentRow
                                key={key}
                                title={title}
                                value={(flatInfo[key] || '') +' '+slug}
                            />
                        )
                        )
                    }

                </div>
            </div>}
        </>
    )
}

InfoAboutApartment.propTypes = {
    flatInfo: PropTypes.object
}

function InfoAboutApartmentRow({ title, value }){
    return (
        <div className="InfoAboutApartment__row">
            <div className="text-style-1920-3-d-small text-color-text-700">{title}</div>
            <div className="text-style-1920-3-d-body-bold text-color-text-900">{value}</div>
        </div>
    )
}
InfoAboutApartmentRow.propTypes = {
    title: PropTypes.any,
    value: PropTypes.any
}
