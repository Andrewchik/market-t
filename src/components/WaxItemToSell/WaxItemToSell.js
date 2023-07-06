import React from "react-router-dom";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";

import './WaxItemToSell.scss'
import CustomButton from "../../generics/CustomButton/CustomButton";

export default function WaxItemToSell({
                                      item: {sale_id, listing_price, collection_name, asset_ids },
                                      showSellModal = null,
                                      showTransferModal = null,
                                      processing = false,
                                      userOwner = false,
                                      hideButtons = false
                                  }) {
    const history = useHistory();


    // const shortenString = (str) => {
    //     if (!str) {
    //         return '';
    //     }
    //     const words = str.split(' ');
    //     if (words.length <= 2) {
    //         return str;
    //     } else {
    //         return words.slice(0, 2).join(' ');
    //     }
    // }

    return (
        <LazyLoad height={'400px'} once>
            <div key={sale_id} className={'imx-item-wrapper'}>
                <div className={'imx-image-wrapper'} onClick={ () => history.push(`/wax-market/${sale_id}`) }>
                    {asset_ids[0]?.data?.img?.startsWith('Qm') ? (
                        <img src={`https://atomichub-ipfs.com/ipfs/${asset_ids[0]?.data?.img}`} alt=""/>
                    ) : (
                        <img src={asset_ids[0]?.data?.img} alt=""/>
                    )}
                </div>
                <div className={ `item-description ${hideButtons ? 'block-center' : ''}` }>
                    <p className={'collection'}>{ collection_name }</p>
                    <p>{asset_ids[0]?.data?.name}</p>

                    { !hideButtons && listing_price && !!!showSellModal &&
                        <div className={'item-action'}>
                            <CustomButton
                                text={ userOwner ? 'Cancel' : 'Buy' }
                                onClick={ () => history.push(`/wax-market/${sale_id}`) }
                                disabled={processing}
                            />

                            <div className={'item-price'}>
                                <p>Price:</p>
                                <p>{Number(listing_price.split(' ')[0]).toFixed(2)} {listing_price.split(' ')[1]}</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </LazyLoad>
    )
}
