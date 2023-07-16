import React, {useContext, useState} from "react";
import Rodal from "rodal";

import { toast } from "react-toastify";


import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomButton from "../../generics/CustomButton/CustomButton";
import Loader from "../../components/Loader/Loader";

import {UALContext} from "ual-reactjs-renderer";
import { transferRAM } from "../../services/wax.service";
import { showErrorMessage } from "../../helpers";

import './BuyRamModal.scss';


export default function BuyRamModal({ visible, onClose, errorRamText }) {
    const [amount, setAmount] = useState('1.00');
    const [processing, setProcessing] = useState(false);
    const { activeUser } = useContext(UALContext);

    const handleTransferRAM = async () => {
        setProcessing(true);
      
        if (activeUser){
            transferRAM({activeUser, amount})
                .then(() => {
                    toast.success('Success');
                    setAmount('1.00')
                    onClose()
                })
                .catch((e) => {
                    showErrorMessage(e)
                    console.log(e)
                    setProcessing(false)
                })
        }
    }

    return (
        <Rodal
            visible={visible}
            onClose={onClose}
            showCloseButton={true}
            className="transfer-modal-box"
            animation="slideUp"
            duration={800}
            closeOnEsc={true}
        >
            <div className={'transfer-modal-wrapper'}>
                <h3>Not Enough RAM</h3>
            

                <p className={'alert'}>Please make sure that your wallet has enough RAM</p>

                <div className="text-field">
                    <CustomTextField
                        placeholder={'Amount RAM'}
                        value={amount}
                        onChange={({ target: { value } }) => setAmount(value)}
                    />
                    <span>WAX</span>
                </div>

                <p className={'error-ram'}>*Your RAM will be freed once your transaction is completed or cancelled</p>

                { processing
                    ? <Loader />
                    : <CustomButton
                        text={'Buy RAM'}
                        onClick={handleTransferRAM}
                        disabled={!!!amount}
                    />
                }
            </div>
        </Rodal>
    );
}
