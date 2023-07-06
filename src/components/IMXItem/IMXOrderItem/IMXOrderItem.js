import React, { Link } from "react-router-dom";

import IMXItem from "../../IMXItem/IMXItem";

import './IMXOrderItem.scss'

export default function IMXOrderItem({ item, userOwnProfile }) {
    const {
        order_id, amount_sold, seller, user, updated_timestamp,
        buy: { data: {properties: buyProperties = {}} },
        sell: {data:  {properties: sellProperties}}
    } = item;

    const properties = buyProperties?.name || sellProperties?.name || "";

    const dateConvert = () => {
        const date = new Date(updated_timestamp);

        let formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "UTC"
        });

        return formattedDate
    }

    const weiToEth = (wei) => {
        return parseFloat(wei / 10 ** 18).toFixed(6);
    };

    const shortEthAddres = (address) => {
        if (typeof address === "string")
            return "0x" + address.substring(0, 4) + "..." + address.substring(36);
    }

    const ethValue = weiToEth(amount_sold);

    return (
        <div className={'imx-order-item'}>
            <IMXItem
                item={ item.buy.data.properties ? item.buy.data.properties : item.sell.data.properties }
                userOwner={userOwnProfile}
                hideButtons={true}
            />

            <div className={'bought-sold-item-info'}>
                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Order id:</p>
                    <p>{ order_id }</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Name:</p>
                    <p>{properties }</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Buyer:</p>
                    <Link to={`/profile/${user}`}>
                        <p>{ shortEthAddres(user) }</p>
                    </Link>
                </div>

                {/*<div className={'bought-sold-item-info-desc-block'}>*/}
                {/*    <p>Seller:</p>*/}
                {/*    <Link to={`/profile/${seller}`}>*/}
                {/*        <p>{ seller }</p>*/}
                {/*    </Link>*/}
                {/*</div>*/}

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Price:</p>
                    <p>{ ethValue } ETH</p>
                </div>

                <div className={'bought-sold-item-info-desc-block'}>
                    <p>Date:</p>
                    <p>{ dateConvert() }</p>
                </div>
            </div>
        </div>
    );
}
