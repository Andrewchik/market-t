import React from "react-router-dom";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { ethers } from 'ethers'

import './IMXOnSale.scss'
import CustomButton from "../../../generics/CustomButton/CustomButton";
import NoImg from "../../../resources/images/no-photo.png";

export default function IMXOnSale({
                                    item: {order_id, buy, sell },
                                    showSellModal = null,
                                    showTransferModal = null,
                                    processing = false,
                                    userOwner = false,
                                    hideButtons = false
                                }) {
    const history = useHistory();

    const shortenString = (str) => {
        if (!str) {
            return '';
        }
        const words = str.split(' ');
        if (words.length <= 2) {
            return str;
        } else {
            return words.slice(0, 2).join(' ');
        }
    }


    function shortenPrice(price) {
        if (typeof price !== 'string') {
            return price;
        }
        if (price.includes('e')) {
            // handle scientific notation
            return Number.parseFloat(price).toExponential();
        }
        if (price.includes('.')) {
            const [whole, fraction] = price.split('.');
            if (fraction.length > 8) {
                const shortenedFraction = `${fraction.slice(0, 1)}...${fraction.slice(-4)}`;
                return `${whole}.${shortenedFraction}`;
            }
        }
        return price;
    }

    return (
        <LazyLoad height={'400px'} once>
            <div key={order_id} className={'imx-item-wrapper'}>
                <div className={'imx-image-wrapper'} onClick={ () => history.push(`/imx-market/${order_id}`) }>
                    <img src={sell.data.properties?.image_url ? sell.data.properties?.image_url : NoImg} alt=""/>
                </div>
                <div className={ `item-description ${hideButtons ? 'block-center' : ''}` }>
                    <p className={'collection'}>{ shortenString(sell.data.properties?.collection.name) }</p>
                    <p>{shortenString(sell.data.properties?.name)}</p>

                    { !hideButtons && buy && !!!showSellModal &&
                        <div className={'item-action'}>
                            <CustomButton
                                text={ userOwner ? 'Cancel' : 'Buy' }
                                onClick={ () => history.push(`/imx-market/${order_id}`) }
                                disabled={processing}
                            />

                            <div className={'item-price'}>
                                <p>Price:</p>
                                <p>{shortenPrice(ethers.utils.formatEther(buy.data.quantity))} ETH</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </LazyLoad>
    )
}