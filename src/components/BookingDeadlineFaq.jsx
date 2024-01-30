import { Grid } from '@mui/material';
import React from 'react';


function IconRemark() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4.90003 3.75401L7.56003 3.69801V4.90201L4.90003 4.84601L6.38403 7.05801L5.29203 7.70201L3.92003 5.35001L2.57603 7.70201L1.45603 7.05801L2.94003 4.84601L0.280029 4.90201V3.69801L2.94003 3.75401L1.45603 1.54201L2.57603 0.89801L3.92003 3.22201L5.29203 0.89801L6.38403 1.54201L4.90003 3.75401Z" fill="#2F343A"/>
        </svg>
    )
}

export default function BookingDeadlineFaq(){
    return (
        <Grid container className="text-style-1920-3-d-small text-color-text-800" spacing={1}>
            <Grid item xs={1.5} alignSelf={'center'}>
                <IconRemark/>
            </Grid>
            <Grid item xs={10.5}>
                Під оплатою бронювання вважається сплата послуги бронювання на 5 днів. Гроші за бронювання не повертаються
            </Grid>
            <Grid item xs={1.5} alignSelf={'center'} display={'flex'}>
                <IconRemark/>
                <IconRemark/>
            </Grid>
            <Grid item xs={10.5}>
                При купівлі апартаментів послуга сплати бронювання врахується у вартість приміщення
            </Grid>
        </Grid>
    )
}