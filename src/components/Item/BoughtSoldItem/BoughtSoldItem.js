import React, { Link } from "react-router-dom";

import Item from "../../Item/Item";

import './BoughtSoldItem.scss'

export default function BoughtSoldItem({ item, userOwnProfile }) {
    const {
        item_id, price, seller, buyer, bought_timestamp,
        data: { name }
    } = item;

    const date = new Date(parseInt(bought_timestamp));

    return (
        <div className={'bought-sold-item'}>
            <Item
                item={{ ...item, price: null }}
                userOwner={userOwnProfile}
                hideButtons={true}
            />

            <div className={'bought-sold-item-info'}>
                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Item id:</p>
                    <p>{ item_id }</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Name:</p>
                    <p>{ name }</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Buyer:</p>
                    <Link to={`/profile/${buyer}`}>
                        <p>{ buyer }</p>
                    </Link>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Seller:</p>
                    <Link to={`/profile/${seller}`}>
                        <p>{ seller }</p>
                    </Link>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Price:</p>
                    <p>{ price } FLOW</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Date:</p>
                    <p>{ date.toLocaleString() }</p>
                </div>
            </div>
        </div>
    );
}
