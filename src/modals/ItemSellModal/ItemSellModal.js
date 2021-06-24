import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { toast } from "react-toastify";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import './ItemSellModal.scss';

import CustomButton from "../../generics/CustomButton/CustomButton";
import CustomSelect from "../../generics/CustomSelect/CustomSelect";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import Loader from "../../components/Loader/Loader";

import { FLOW } from '../../constants';
import { sellMarketItem } from '../../flow';
import { showErrorMessage } from "../../helpers";

function ItemSellModal({ visible, onClose, itemId, ipfs, moveItemToOnSaleBlock }) {
    const [currency, setCurrency] = useState(FLOW);
    const [price, setPrice] = useState('');
    const [receivedMoney, setReceivedMoney] = useState('0.00');
    const [selling, setSelling] = useState(false);

    const handleClose = () => {
        setPrice('');
        setReceivedMoney('0.00');
        onClose();
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;

        setPrice(value);
        setReceivedMoney((parseFloat(value) * 0.95).toFixed(2));
    }

    const handleSellMarketItem = () => {
        setSelling(true);

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
                <p className={'item-id'}>Item id: { itemId }</p>
                <div className={'item-sell-image-price'}>
                    <ReactPlayer
                        url={ ipfs ?  `https://ipfs.io/ipfs/${ipfs}` : '' }
                        playing={true}
                        loop={true}
                        width={'350px'}
                        height={'auto'}
                        style={{ display: 'flex', maxHeight: '300px' }}
                    />
                    <div className={'item-sell-price-wrapper'}>
                        <div className={'item-sell-price-actions'}>
                            <CustomTextField
                                placeholder={'Price'}
                                value={price}
                                onChange={handlePriceChange}
                            />
                            <CustomSelect
                                text={''}
                                initialOption={currency}
                                options={[FLOW]}
                                handleChange={setCurrency}
                            />
                        </div>
                        <div className={'sale-info'}>
                            <p>Market fee 2.5%</p>
                            <p>Collection fee 2.5%</p>
                            <p>You will receive <span>{ receivedMoney }</span> FLOW</p>
                        </div>
                        { selling
                            ? <Loader />
                            : <CustomButton
                                text={'SELL'}
                                onClick={handleSellMarketItem}
                                disabled={!!!price}
                            />
                        }
                    </div>
                </div>
            </div>
        </Rodal>
    );
}

export default ItemSellModal;
