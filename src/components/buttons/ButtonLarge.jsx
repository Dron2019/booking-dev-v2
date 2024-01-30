import React, { useRef, useState } from "react";
import gsap from "gsap";


export default function ButtonLarge({ children, ...props }){

    const ref = useRef(null);
    const [hover, setHover] = useState(false);
    

    const onMouseEnter = () => {
        setHover(true);
        gsap.to(ref.current, {
            background: 'linear-gradient(250deg, #093621 -10.12%, rgba(77, 164, 148, 0.20) 51.23%), linear-gradient(120deg, #082D12 -31.62%, rgba(110, 228, 143, 0.20) 93.21%), linear-gradient(119deg, rgba(226, 255, 48, 0.00) 13.23%, rgba(226, 255, 48, 0.30) 65.61%), linear-gradient(334deg, #7BAD3B -69.15%, #9BD353 166.51%)',
            boxShadow: '0px 6px 20px 0px rgba(33, 154, 60, 0.80) inset, 0px 8px 20px 0px rgba(106, 149, 60, 0.50), 0px 4px 8px 0px rgba(53, 135, 24, 0.70)',
            duration: 0.5,
        });
    };
    
    const onMouseLeave = () => {
        setHover(false);
        gsap.to(ref.current, {
            background: 'linear-gradient(250deg, #11663D -10.12%, rgba(77, 164, 148, 0.00) 51.23%), linear-gradient(120deg, #1E6933 -31.62%, rgba(110, 228, 143, 0.00) 93.21%), linear-gradient(119deg, rgba(226, 255, 48, 0.00) 13.23%, rgba(226, 255, 48, 0.30) 65.61%), linear-gradient(334deg, #7BAD3B -69.15%, #9BD353 166.51%)',
            boxShadow: '0px 6px 20px 0px rgba(101, 154, 33, 0.80) inset, 0px 8px 20px 0px rgba(106, 149, 60, 0.50), 0px 4px 8px 0px rgba(53, 135, 24, 0.70)',
            duration: 0.5,
        });
    };

    return (
        <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="ob_button_large text-style-1920-3-d-body-bold" {...props} ref={ref}>
            {children}
        </button>
    )
}