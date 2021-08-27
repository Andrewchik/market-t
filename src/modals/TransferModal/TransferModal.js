import React, { useState } from "react";
import Rodal from "rodal";

import { toast } from "react-toastify";

import './TransferModal.scss';

import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomButton from "../../generics/CustomButton/CustomButton";
import Loader from "../../components/Loader/Loader";

import { renderDarkCountryItemImageOrVideo } from "../../helpers";

import { transferItem } from "../../flow";

export default function TransferModal({ visible, onClose, itemId, ipfs, mediaUrl, removeTransferredItemFromMyItems }) {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleTransfer = () => {
        setProcessing(true);

        transferItem({
            recipient: recipientAddress,
            withdrawID: itemId
        })
            .then(() => {
                removeTransferredItemFromMyItems();
                toast.success('Success');

                onClose();
            })
            .catch(e => {
                console.log(e);
                toast.error(e.message);
            })
            .finally(() => setProcessing(false));
    };

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
                <h3>Transfer item</h3>
                <p className={'item-id'}>Item id: { itemId }</p>
                { renderDarkCountryItemImageOrVideo(
                    ipfs, mediaUrl, null, true,
                    { width: '100%', height: 'auto', style: { display: 'flex', maxHeight: '300px', justifyContent: 'center' } }
                ) }

                <p className={'alert'}>Please make sure that Recipient Address is correct</p>

                <CustomTextField
                    placeholder={'Recipient Address'}
                    value={recipientAddress}
                    onChange={({ target: { value } }) => setRecipientAddress(value)}
                />

                { processing
                    ? <Loader />
                    : <CustomButton
                        text={'Transfer'}
                        onClick={handleTransfer}
                        disabled={!!!recipientAddress}
                    />
                }
            </div>
        </Rodal>
    );
}
