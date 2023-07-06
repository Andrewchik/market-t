import React, {useContext, useState} from "react";
import { toast } from "react-toastify";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import './ItemSellModal.scss';

import CustomButton from "../../generics/CustomButton/CustomButton";
import CustomSelect from "../../generics/CustomSelect/CustomSelect";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import Loader from "../../components/Loader/Loader";

import {ETH, FLOW, SDM} from '../../constants';
import { sellMarketItem } from '../../flow';

import { renderDarkCountryItemImageOrVideo, showErrorMessage } from "../../helpers";
import {Link} from "@imtbl/imx-sdk";
import {UALContext} from "ual-reactjs-renderer";
import {getSales, sellItem} from "../../services/wax.service";

function ItemSellModal({ visible, showBuyRamModal, onClose, itemId, ipfs, mediaUrl, moveItemToOnSaleBlock, moveWaxItemToOnSaleBlock, imxItemUrl, token_address, token_id, asset_ids, mediaWaxUrl, setWaxItemsToSale }) {
    const { activeUser } = useContext(UALContext);
    const [currency, setCurrency] = useState(FLOW);
    const [price, setPrice] = useState('');
    const [receivedMoney, setReceivedMoney] = useState('0.00');
    const [selling, setSelling] = useState(false);

    const link = new Link(process.env.SANDBOX_LINK_URL)

    const handleClose = () => {
        setPrice('');
        setReceivedMoney('0.00');
        onClose();
    }


    const handlePriceChange = (event) => {
        const value = event.target.value;

        setPrice(value);
        if (!localStorage.getItem('metamask')){
            setReceivedMoney((parseFloat(value) * 0.95).toFixed(2));
        }

        if (localStorage.getItem('metamask')){
            setReceivedMoney((parseFloat(value) * 0.97).toFixed(2));
        }

        if (activeUser){
            setReceivedMoney((parseFloat(value) * 0.995).toFixed(4));
        }

    }

    const handleSellMarketItem = () => {
        setSelling(true);

        if (!localStorage.getItem('metamask') && !activeUser){
            sellMarketItem({
                saleItemPrice: price,
                saleItemID: itemId
            })
                .then(() => {
                    moveItemToOnSaleBlock(price);

                    toast.success('Item put on sale');

                    handleClose();
                })
                .catch(e => {
                    showErrorMessage(e);
                    console.log(e);
                })
                .finally(() => setSelling(false));
        }


            if (localStorage.getItem('metamask') && !activeUser){
                setSelling(true)

                link.sell({
                    amount: price,
                    tokenId: token_id,
                    tokenAddress: token_address,
                })
                    .then(() => {

                        toast.success('Item put on sale');

                        handleClose();
                    })
                    .catch(e => {
                        showErrorMessage(e);
                        console.log(e);
                    })
                    .finally(() => setSelling(false));

            }

            if (activeUser){
                sellItem({activeUser, asset_ids, listing_price: price})
                    .then(() => {
                        toast.success('Item put on sale');
                        moveWaxItemToOnSaleBlock(price)
                
                            getSales()
                                .then((data) => {
                                    const filteredData = data
                                        .filter(item => item.seller === activeUser?.accountName)
                                        .flat();

                                    setWaxItemsToSale(filteredData);
                                })

                        handleClose();
                    })
                    .catch(e => {
                        showErrorMessage(e);
                        showBuyRamModal(true)
                        console.log(e);
                    })
                    .finally(() => setSelling(false));
            }
    }


    return (
        <Rodal
            visible={visible}
            onClose={handleClose}
            showCloseButton={true}
            className="item-sell-modal-box"
            animation="slideUp"
            duration={800}
            closeOnEsc={true}
        >
            <div className={'item-sell-modal-wrapper'}>
                <h3>Put item on sale</h3>
                <p className={'item-id'}>Item id: { itemId || asset_ids }</p>
                <div className={'item-sell-image-price'}>
                    {!localStorage.getItem('metamask') && !activeUser &&
                         renderDarkCountryItemImageOrVideo(
                                ipfs, mediaUrl, null, true,
                    { width: '350px', height: 'auto', style: { display: 'flex', maxHeight: '300px' } }
                        )
                    }

                    {localStorage.getItem('metamask') && !activeUser &&
                        <img src={imxItemUrl} alt=""/>
                    }

                    {activeUser &&
                        mediaWaxUrl.startsWith('Qm') ? (
                                <img className={'wax-img'} src={`https://atomichub-ipfs.com/ipfs/${mediaWaxUrl}`} alt=""/>
                            ) : (
                                <img src={mediaWaxUrl} alt=""/>
                            )
                    }



                    <div className={'item-sell-price-wrapper'}>
                        <div className={'item-sell-price-actions'}>
                            <CustomTextField
                                placeholder={'Price'}
                                value={price}
                                onChange={handlePriceChange}
                            />
                            {!localStorage.getItem('metamask') && !activeUser &&
                            <CustomSelect
                                text={''}
                                initialOption={currency}
                                options={[FLOW]}
                                handleChange={setCurrency}
                            />}
                            {localStorage.getItem('metamask') && !activeUser &&
                            <CustomSelect
                                text={''}
                                initialOption={currency}
                                options={[ETH]}
                                handleChange={setCurrency}
                            />}
                            {activeUser &&
                                <CustomSelect
                                    text={''}
                                    initialOption={currency}
                                    options={[SDM]}
                                    handleChange={setCurrency}
                                />
                            }

                        </div>
                        {!localStorage.getItem('metamask') && !activeUser &&
                            <div className={'sale-info'}>
                                <p>Market fee 2%</p>
                                <p>Collection fee 2.5%</p>
                                <p>You will receive <span>{ receivedMoney && parseFloat(receivedMoney) > 0 ? receivedMoney : 0 }</span> FLOW</p>
                            </div>
                        }

                        {localStorage.getItem('metamask') && !activeUser &&
                            <div className={'sale-info'}>
                                <p>Protocol fee 2%</p>
                                <p>Royalties to creator 0%</p>
                                <p>Marketplace fee 1%</p>
                                <p>You will receive <span>{ receivedMoney && parseFloat(receivedMoney) > 0 ? receivedMoney : 0 }</span> ETH</p>
                            </div>
                        }

                        {activeUser &&
                            <div className={'sale-info'}>
                                <p>Collection fee 0.05%</p>
                                <p>You will receive <span>{ receivedMoney && parseFloat(receivedMoney) > 0 ? receivedMoney : 0 }</span> SDM</p>
                            </div>
                        }

                        { selling
                            ? <Loader />
                            : <CustomButton
                                text={'SELL'}
                                onClick={handleSellMarketItem}
                                disabled={!!!price || parseFloat(price) <= 0}
                            />
                        }
                    </div>
                </div>
            </div>
        </Rodal>
    );
}

export default ItemSellModal;
