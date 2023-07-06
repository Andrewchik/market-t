import React from "react-router-dom";
import LazyLoad from "react-lazyload";

import './WaxItemSoldBought.scss'

export default function WaxItemSoldBought({
                                    item: {asset_ids: { data: {name, img}, collection: { collection_name }, asset_id }},
                                    hideButtons = false,
                                }) {


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

    return (
        <LazyLoad key={Number(asset_id)} height={'400px'} once>
            <div className={'imx-item-wrapper'}>
                <div className={'imx-image-wrapper'}>
                    {img?.startsWith('Qm') ? (
                        <img src={`https://atomichub-ipfs.com/ipfs/${img}`} alt=""/>
                    ) : (
                        <img src={img} alt=""/>
                    )}
                </div>
                <div className={ `item-description ${hideButtons ? 'block-center' : ''}` }>
                    <p className={'collection'}>{ shortenString(collection_name) }</p>
                    <p>{shortenString(name)}</p>
                </div>
            </div>
        </LazyLoad>
    )
}
