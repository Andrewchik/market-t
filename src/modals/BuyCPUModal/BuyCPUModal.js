import React, {useContext, useState} from "react";
import Rodal from "rodal";

import { toast } from "react-toastify";

import './BuyCPUModal.scss';

import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomButton from "../../generics/CustomButton/CustomButton";
import Loader from "../../components/Loader/Loader";

import {UALContext} from "ual-reactjs-renderer";
import { transferCPU } from "../../services/wax.service";
import { showErrorMessage } from "../../helpers";


export default function BuyCPUModal({ visible, onClose }) {
    const [amount, setAmount] = useState('');
    const [amountCPU, setAmountCPU] = useState('');
    const [processing, setProcessing] = useState(false);
    const { activeUser } = useContext(UALContext);


    const handleTransferCPU = async () => {
        setProcessing(true);
      
        if (activeUser){
            transferCPU({activeUser, amount, amountCPU})
                .then(() => {
                    toast.success('Success');
                    setAmount(0)
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
                <h3>CPU and NET</h3>
            

                <p className={'alert'}>Please make sure that your wallet has enough CPU and NET</p>

                <CustomTextField
                    placeholder={'Amount CPU (WAX)'}
                    value={amount}
                    onChange={({ target: { value } }) => setAmount(value)}
                />

                <CustomTextField
                    placeholder={'Amount NET (WAX)'}
                    value={amountCPU}
                    onChange={({ target: { value } }) => setAmountCPU(value)}
                />

                { processing
                    ? <Loader />
                    : <CustomButton
                        text={'Buy CPU or NET'}
                        onClick={handleTransferCPU}
                        disabled={!!!amount && !!!amountCPU}
                    />
                }
            </div>
        </Rodal>
    );
}
