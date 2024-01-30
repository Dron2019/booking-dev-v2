import PropTypes from "prop-types"
import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import ButtonLarge from '../components/buttons/ButtonLarge';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function OffertaAgreement({ goBack = () => {} }){

    return (
        <Modal
            open={true}
            onClose={goBack}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style} className="MuiBox-black-border">
                <div className="text-style-1920-h-5-bold">
                Text in a modal
                </div>
                <div className="text-style-1920-body">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</div>
                <ButtonLarge onClick={goBack}> 
                    Продовжити
                </ButtonLarge>
            </Box>
        </Modal>
    )
}
OffertaAgreement.propTypes = {
    navigate: PropTypes.func
}
