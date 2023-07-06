import React, { Link } from "react-router-dom";
import WaxItemSoldBought from "../WaxItemSoldBought/WaxItemSoldBought";

import './BoughtSoldIWaxtem.scss'


export default function BoughtSoldWaxItem({ item, userOwnProfile }) {
    const {
        asset_ids, price, recipient, buyer,
    } = item;


    return (
        <div className={'bought-sold-item'}>
            <WaxItemSoldBought
                item={{ asset_ids: asset_ids[0], price: null }}
                hideButtons={true}
            />

            <div className={'bought-sold-item-info'}>
                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Item id:</p>
                    <p>{asset_ids[0]?.asset_id}</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Name:</p>
                    <p>{asset_ids[0]?.name}</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Buyer:</p>
                    <Link to={`/profile/${buyer}`}>
                        <p>{ buyer }</p>
                    </Link>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Seller:</p>
                    <Link to={`/profile/${recipient}`}>
                        <p>{ recipient }</p>
                    </Link>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Price:</p>
                    <p>{ price }</p>
                </div>

                {/*<div className={'bought-sold-item-info-desc-block'}>*/}
                {/*    <p>Date:</p>*/}
                {/*    <p>{ date.toLocaleString() }</p>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
