import React, { Link } from "react-router-dom";

import { renderDarkCountryItemImageOrVideo } from "../../../helpers";

import './BoughtSoldItem.scss'

export default function BoughtSoldItem({item}) {
    const {
        item_id, collection, description, price, seller, buyer, bought_timestamp,
        data: { ipfs, mediaUrl, name }
    } = item;

    const date = new Date(parseInt(bought_timestamp));

    return (
        <div className={'bought-sold-item'}>
            <div className={'bought-sold-item-img'}>
                { renderDarkCountryItemImageOrVideo(
                    ipfs, mediaUrl, name, false,
                    { width: '100%', height: 'auto' }
                ) }
            </div>
            <div className={'bought-sold-item-info'}>
                <p className={'collection-name'}>{collection}</p>
                <p className={'item-id'}>Item id: {item_id}</p>
                <p><span>Name:</span> {name}</p>
                <p>{description}</p>
                <p><Link to={`/profile/${buyer}`}><span>Buyer:</span> {buyer}</Link></p>
                <p><Link to={`/profile/${seller}`}><span>Seller:</span> {seller}</Link></p>
                <p><span>Price:</span> {price} FLOW</p>
                <p>Date: {date.toLocaleString()}</p>
            </div>
        </div>
    )
}
