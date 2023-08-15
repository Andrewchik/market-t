import React, {useContext, useState} from "react";
import Rodal from "rodal";
import {ERC721TokenType, Link} from "@imtbl/imx-sdk";

import { toast } from "react-toastify";

import './TransferModal.scss';

import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomButton from "../../generics/CustomButton/CustomButton";
import Loader from "../../components/Loader/Loader";

import { renderDarkCountryItemImageOrVideo } from "../../helpers";

import { transferItem } from "../../flow";
import {UALContext} from "ual-reactjs-renderer";
import {transferWaxItem} from "../../services/wax.service";

export default function TransferModal({ visible, onClose, itemId, ipfs, mediaUrl, removeTransferredItemFromMyItems, imxItemUrl, token_address, token_id, asset_id }) {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [processing, setProcessing] = useState(false);
    const { activeUser } = useContext(UALContext);
    const link = new Link('https://api.x.immutable.com')

    const handleTransfer = async () => {
        setProcessing(true);
        if (!localStorage.getItem('metamask') && !activeUser){
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
                        toast.error(e);
                    })
                    .finally(() => setProcessing(false));
        }

        if (localStorage.getItem('metamask') && !activeUser){
            await link.transfer([
                {
                    type: ERC721TokenType.ERC721, // Must be of type ERC721
                    tokenId: token_id, // the token ID
                    tokenAddress: token_address, // the collection address / contract address this token belongs to
                    toAddress: recipientAddress, // the wallet address this token is being transferred to
                }
            ])
                .then(() => {
                    onClose()
                })
                .catch((e) => {
                    console.log(e)
                })
        }

        if (activeUser){
            transferWaxItem({activeUser, recipientAddress, asset_id})
                .then(() => {
                    toast.success('Success');
                    onClose()
                })
                .catch((e) => {
                    console.log(e)
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
                <h3>Transfer item</h3>
                <p className={'item-id'}>Item id: { itemId || asset_id }</p>
                {!localStorage.getItem('metamask') &&
                     renderDarkCountryItemImageOrVideo(
                            ipfs, mediaUrl, null, true,
                { width: '100%', height: 'auto', style: { display: 'flex', maxHeight: '300px', justifyContent: 'center' } }
                    )
                }

                {localStorage.getItem('metamask') &&
                    <img src={imxItemUrl} alt=""/>
                }


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
