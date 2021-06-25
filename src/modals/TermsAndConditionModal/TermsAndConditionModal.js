import React, { useState } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import Checkbox from '@material-ui/core/Checkbox';
import CustomButton from "../../generics/CustomButton/CustomButton";

import './TermsAndConditionModal.scss';

import { CONFIRMED_TERMS_AND_CONDITIONS } from '../../constants';

function TermsAndConditionModal({ visible, handleClose }) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const handleConfirm = () => {
        localStorage.setItem(CONFIRMED_TERMS_AND_CONDITIONS, CONFIRMED_TERMS_AND_CONDITIONS);
        handleClose();
    };

    return (
        <Rodal
            visible={ visible }
            onClose={ () => {} }
            showCloseButton={ false }
            className="terms-and-condition-modal-box"
            animation="slideUp"
            duration={ 800 }
            closeOnEsc={ false }
        >
            <div className={ 'terms-and-condition-modal-wrapper' }>
                <h1>TopExpo.io Terms, Conditions & Privacy Policy</h1>
                <div className={ 'terms-and-condition-modal-rules' }>
                    <div className={'rules-block'}>
                        <h3>1. Field of Reference</h3>
                        <p>
                            <span>a.</span> This document regulates the use of <span>https://topexpo.io/</span> service and access to it’s features
                            by users, that includes without limitation digital assets sales and purchase operations.
                        </p>
                    </div>
                    <div className={'rules-block'}>
                        <h3>2. Service operation</h3>
                        <p>
                            <span>a.</span> The TopExpo.io service is built using smart-contracts providing users with an option to:
                            buy,
                            sell, show and transfer digital assets (NFTs) on the peer-to-peer platform.
                        </p>
                        <p>
                            <span>b.</span> TopExpo.io's sole function is to work as a digital marketplace, not being a party to any
                            agreement between platform users.
                        </p>
                    </div>
                    <div className={'rules-block'}>
                        <h3>3. Risk information and backgrounds</h3>
                        <p>
                            <span>a.</span> Users should be aware that digital items prices are outside of TopExpo.io control and our
                            service does not guarantee neither fairness, nor accuracy of the price of any item listed on
                            the
                            marketplace.
                        </p>
                        <p>
                            <span>b.</span> The TopExpo.io marketplace is built using blockchain technology, in this case - Flow
                            blockchain, cryptocurrency and smart contracts, that are considered to be an experimental
                            technology. Users should be aware of risks related to the use of such technologies.
                        </p>
                        <p>
                            <span>c.</span> We never guarantee that a purchaser will earn or not lose his/her money during the use of
                            TopExpo.io marketplace due to extreme volatility of digital assets and other reasons.
                        </p>
                        <p>
                            <span>d.</span> TopExpo.io doesn’t store, receive or send any of the digital (NFT) assets. All
                            transactions
                            take place within the Flow blockchain.
                        </p>
                    </div>
                    <div className={'rules-block'}>
                        <h3>4. Accounts and account termination</h3>
                        <p>
                            <span>a.</span> You should be over 18 years to have a right to use the TopExpo.io service.
                        </p>
                        <p>
                            <span>b.</span> To access the service, a user should have a Blocto Wallet and an active Flow account.
                        </p>
                        <p>
                            <span>c.</span> Users agree that TopExpo.io has a right to block access to the service at any moment
                            without
                            any further notice or explanation.
                        </p>
                        <p>
                            <span>d.</span> The user is the sole person to be responsible for the safety of his/her information.
                        </p>
                    </div>
                    <div className={'rules-block'}>
                        <h3>5. Fees</h3>
                        <p>
                            <span>a.</span> Users should be aware that all the transactions (buy/sell) operations are subject to
                            secondary
                            market fee, the fee % amount iis displayed next to the listed item.
                        </p>
                    </div>
                    <div className={'rules-block'}>
                        <h3>6. Privacy Policy</h3>
                        <p>
                            <span>a.</span> All the information about a specific user stored by our service can be deleted upon
                            request
                            of the user.
                        </p>
                        <p>
                            <span>b.</span> All the user information stored by TopExpo.io is safely stored in a way that ensures
                            protection
                            from unauthorized parties access and is used solely for better user experience.
                        </p>
                    </div>
                    <div className={'rules-block'}>
                        <h3>7. Disputes and miscellaneous</h3>
                        <p>
                            <span>a.</span> Consumers can use a special platform for settlement of disputes:
                            <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
                                 http://ec.europa.eu/consumers/odr
                            </a>
                        </p>
                        <p>
                            <span>b.</span> TopExpo.io does not participate in such disputes and is not obliged to do so.
                        </p>
                    </div>
                </div>
                <div className={'confirm-wrapper'}>
                    <div className={'check-wrapper'}>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <p onClick={handleChange}>
                            I acknowledge and accept TopExpo NFT Marketplace Terms and Conditions
                        </p>
                    </div>
                    <CustomButton
                        text={'Confirm'}
                        onClick={handleConfirm}
                        disabled={!checked}
                    />
                </div>
            </div>
        </Rodal>
    );
}

export default TermsAndConditionModal;
