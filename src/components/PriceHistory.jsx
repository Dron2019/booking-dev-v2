import PropTypes from "prop-types"
import React, { Suspense } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { parseISO, format } from 'date-fns';
import { Portal } from "@mui/material";

const  GraphicPriceHistory = React.lazy(() => import('./GraphicPriceHistory'));
// import GraphicPriceHistory from "./GraphicPriceHistory";

export default function PriceHistory({ currecies = {}, price_history = [], flatId }) {

    const [expanded, setExpanded] = React.useState(false);

    const [showGraphic, setShowGraphic] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(false);
        // setExpanded(isExpanded ? panel : false);
    };


    return (
        <>
            {showGraphic && <Suspense fallback={<>Loading</>}>
                <Portal>
                    <GraphicPriceHistory 
                    flatId={flatId}
                    data={price_history}
                    close={() => {
                        setShowGraphic(false);
                    }}
                    />
                </Portal>
                </Suspense>
            }
            <div className='PriceHistory'>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        className='PriceHistory__header'
                        // expandIcon={<BirdyIcon />}
                        expandIcon={false}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        onClick={(evt) => {
                            evt.stopPropagation();
                            setShowGraphic(true);
                        }}
                    >
                        <ExpandMoreIcon onClick={(evt) => {
                            evt.stopPropagation();
                            setShowGraphic(true);
                        }}/>
                        <div className="text-style-1920-3-d-small color-black">
                            Показати динаміку зміни цін
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {price_history.map(({ date, price, price_uah, price_usd }, i) => (
                            <div className="PriceHistory__row text-style-1920-3-d-small" key={i}>
                                <div className="text-style-1920-3-d-small color-gray-3">
                                    Ціна на &nbsp;
                                    <span style={{ fontWeight: 700 }}>
                                        {format(parseISO(date), 'dd.MM.yyyy')}
                                    </span>
                                </div>
                                <div className="text-style-1920-3-d-small color-gray-3">
                                    {price_usd} {currecies.USD}
                                </div>
                                <div className="text-style-1920-3-d-small color-gray-3">
                                    {price_uah}  {currecies.UAH}
                                </div>
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}

PriceHistory.propTypes = {
    price_history: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        price: PropTypes.string,
        price_uah: PropTypes.string,
        price_usd: PropTypes.string,
    })),
}


function BirdyIcon() {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99762 6.82255L12.0872 11.1733L13.1802 10.146L8.5441 5.21382L7.99762 4.63243L7.45114 5.21382L2.81507 10.146L3.90804 11.1733L7.99762 6.82255Z"
                fill="#111111"
            />
        </svg>
    )
}

function ExpandMoreIcon(props) {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3746 2.25115C12.5876 2.26295 12.7855 2.3649 12.9188 2.53148L14.2521 4.19815C14.5109 4.52159 14.4584 4.99356 14.135 5.25232C13.8116 5.51108 13.3396 5.45864 13.0808 5.13519L12.9098 4.92142C12.7437 6.36701 12.523 7.51528 12.2612 8.40881C11.9061 9.62085 11.4356 10.5064 10.7847 10.9522C10.434 11.1923 10.0379 11.2985 9.63022 11.2516C9.23831 11.2065 8.89771 11.0275 8.61889 10.8078C8.07311 10.3776 7.63403 9.69032 7.31445 8.97127C6.91975 8.08319 6.58042 7.85685 6.45126 7.81714C6.40949 7.80429 6.24942 7.76614 5.94516 8.12245C5.64557 8.47329 5.34089 9.07626 5.11247 9.8891C4.88727 10.6904 4.74981 11.648 4.74981 12.6667C4.74981 13.0809 4.41402 13.4167 3.99981 13.4167C3.5856 13.4167 3.24981 13.0809 3.24981 12.6667C3.24981 11.5187 3.40401 10.4241 3.6684 9.48329C3.92956 8.55395 4.31239 7.72463 4.80446 7.14838C5.29186 6.57761 6.02763 6.11758 6.8921 6.38338C7.6692 6.62232 8.24654 7.37514 8.68517 8.36206C8.95818 8.97635 9.27373 9.41402 9.54739 9.62971C9.6783 9.73288 9.76363 9.75705 9.80169 9.76143C9.82397 9.76399 9.86193 9.76604 9.93717 9.71452C10.1381 9.57692 10.4871 9.12916 10.8217 7.98702C11.0393 7.24453 11.2347 6.26593 11.3894 5.0044L11.3873 5.00647L11.3851 5.00868L11.3829 5.01087L11.3808 5.01305L11.3786 5.01521L11.3743 5.01948L11.3579 5.0359L11.3425 5.05128L11.3281 5.06565L11.3023 5.09153L11.2611 5.13271L11.2528 5.141L11.2523 5.14146C11.2517 5.14206 11.2507 5.14314 11.2489 5.14486L11.2453 5.14855L11.2322 5.16158L11.2267 5.16713L11.2254 5.16842L11.2241 5.16968L11.2235 5.17029L11.2229 5.17089L11.2217 5.17208L11.2135 5.1803L11.2028 5.19101L11.2011 5.19269L11.2008 5.19305L11.2006 5.19323L11.2004 5.1934L11.2002 5.19356L11.2001 5.19372L11.1999 5.19388L11.1998 5.19403L11.1992 5.19459L11.1987 5.19508L11.1979 5.19586L11.1974 5.19641L11.1973 5.19651L11.1972 5.19656L11.1972 5.19661L11.197 5.19676L11.1969 5.19694L11.1968 5.19696L11.1968 5.19697L11.1968 5.19699L11.1968 5.19699L11.1968 5.197C10.9039 5.48989 10.429 5.48989 10.1361 5.197C9.84325 4.90411 9.84325 4.42923 10.1361 4.13634L10.1361 4.13633L10.1362 4.13633L10.1362 4.13633L10.1362 4.13628L10.1364 4.1361L10.1367 4.13575L10.137 4.1355L10.1373 4.1352L10.1421 4.13035L10.1716 4.10092L10.2416 4.03087L10.2972 3.97524L10.3312 3.94133L10.3695 3.903L10.3904 3.8821L10.4013 3.8712L10.4125 3.85999L10.4358 3.83664L10.4419 3.83061L10.4449 3.82756L10.448 3.82449C10.4788 3.79365 10.4233 3.84917 10.4542 3.8183L10.4573 3.81517L10.4605 3.81202L10.5137 3.75883L10.5423 3.73019L10.5571 3.71534L10.5609 3.71157L10.5647 3.70779L10.5723 3.70014L10.5801 3.6924L10.5879 3.68458L10.5958 3.67666L10.5998 3.67267L10.6038 3.66865L10.6201 3.65236L10.6368 3.63569L10.6713 3.60122L10.7073 3.56521L10.7449 3.52763L10.7497 3.52282L10.7545 3.51798L10.7594 3.51312L10.7643 3.50823L10.7841 3.48843L10.8674 3.40509L11.0549 3.21762L11.0675 3.20495L11.0739 3.19857L11.0803 3.19216L11.1063 3.16623L11.1327 3.13983L11.1595 3.11296L11.2147 3.05778L11.2288 3.04369L11.243 3.02947L11.2574 3.01513L11.2718 3.00066L11.3309 2.94156L11.3612 2.91126L11.392 2.88045L11.3998 2.87267L11.4076 2.86485L11.4234 2.84913L11.4552 2.81729L11.4632 2.80925L11.4713 2.80118L11.4794 2.79308L11.4875 2.78494L11.5039 2.76857L11.5122 2.76033L11.5204 2.75206L11.5878 2.68472L11.6573 2.61522L11.6928 2.57966L11.7289 2.54355L11.8028 2.46967C11.9537 2.31882 12.1616 2.23935 12.3746 2.25115Z"
                fill="#7BAD3B"
            />
        </svg>
    )
}