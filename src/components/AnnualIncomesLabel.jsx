import React, { useState } from 'react';
import ButtonQuestion from './buttons/ButtonQuestion';
import IconCoins from '../assets/icons/IconCoins';
import { Modal } from '@mui/material';
 
export default function AnnualIncomesLabel({ value, currencyLabel = '', button }){

    const [showFaq, setShowFaq] = useState(false);

    const closeTutorial = () => setShowFaq(false);

    const openTutorial = () => setShowFaq(true);

    return (
        <>
            <Modal open={showFaq} className='AnnualIncomesTutorial' onBackdropClick={closeTutorial}>
                <div className="AnnualIncomesTutorial__content">
                    <svg className="AnnualIncomesTutorial__close" onClick={closeTutorial} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L8 6.58579L12.2929 2.29289C12.6834 1.90237 13.3166 1.90237 13.7071 2.29289C14.0976 2.68342 14.0976 3.31658 13.7071 3.70711L9.41421 8L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L8 9.41421L3.70711 13.7071C3.31658 14.0976 2.68342 14.0976 2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929L6.58579 8L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z" fill="#111111"/>
                    </svg>
                    <div className="text-style-1920-3-d-h-3 text-color-text-900 AnnualIncomesTutorial__content-title">
                        Що таке орієнтовний річний дохід?
                    </div>
                    <div className="text-style-1920-3-d-body text-color-text-700 AnnualIncomesTutorial__content-text">
                        <p>На прикладі розберемо дохідність апартаментів:</p>
                        <p>· за 2021 рік власник апартаментів площею 33 кв. м отримав 10,31% річних</p>
                        <p>· за першу половину 2022 року ще 6,5%</p>
                        <p>· після він продав апартаменти, та отримав різницю у вартості, що склала більше 40% від ціни, за яку він придбав апартаменти.</p>
                    </div>
                    {button && <div className="AnnualIncomesTutorial__content-button1" onClick={closeTutorial}>{button}</div>}
                </div>
            </Modal>
            <div className='AnnualIncomesLabel'>
                <IconCoins/>
                <div className="text-style-1920-3-d-small text-color-text-800">
                    Орієнтовний річний дохід
                </div>
                <div className="text-style-1920-3-d-body-bold text-color-text-900">
                    ≈ {value} $*
                </div>
                <ButtonQuestion onClick={openTutorial}/>
            </div>
        </>
    )
}