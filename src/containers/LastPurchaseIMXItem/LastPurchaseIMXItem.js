import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import {IMMUTABLE_SANDBOX_API_V3} from "../../constants";

import ListedItemLoadingPlaceholder from "../../components/LoadingPlaceholders/ListedItemLoadingPlaceholder/ListedItemLoadingPlaceholder";

import './LastPurchaseIMXItem.scss';
import '../ListedItem/ListedItem.scss';


export default function LastPurchaseIMXItem({ history, match: { params: { id } } }) {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = () => {
            axios.get(`${IMMUTABLE_SANDBOX_API_V3}/orders/${id}`)
                .then(({ data }) => !!data ? setItem(data) : history.push('/market'))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        };

        fetchItem();
    }, [id, history]);

    const weiToEth = (wei) => {
        return parseFloat(wei / 1e18);
    };


    const shortEthAddres = (address) => {
        if (typeof address === "string")
            return "0x" + address.substring(0, 4) + "..." + address.substring(36);
    }

    return (
        <div className={'listed-item-wrapper'}>
            { loading
                ? <ListedItemLoadingPlaceholder />
                : <>
                    <div className={'listed-item-container'}>
                        <div className={'listed-item-image'}>
                            {item.sell && item.sell.data && item.sell.data.properties && item.sell.data.properties.image_url && (
                                <img src={item.sell.data.properties.image_url} alt="" />
                            )}
                            {(!item.sell || !item.sell.data || !item.sell.data.properties || !item.sell.data.properties.image_url) && item.buy && item.buy.data && item.buy.data.properties && item.buy.data.properties.image_url && (
                                <img src={item.buy.data.properties.image_url} alt="" />
                            )}

                        </div>

                        <div className={'listed-item-info'}>
                            <p className={'item-description'}>
                                {item.sell && item.sell.data && item.sell.data.properties && item.sell.data.properties.name && item.sell.data.properties.name }
                                {item.buy && item.buy.data && item.buy.data.properties && item.buy.data.properties.name && item.buy.data.properties.name}
                            </p>
                            <p className={'mint-info'}>OrderID - { item.order_id }</p>

                            {/*<div className={'category'}>*/}
                            {/*    <img src={DcLogo2} alt="category" />*/}

                            {/*    { item.data && item.data.description &&*/}
                            {/*        <p>{ item.data.description }</p>*/}
                            {/*    }*/}

                            {/*    { item.data && item.data.rarity && !item.data.description && item.data.type === 'Card' &&*/}
                            {/*        <p>Dark Country {item.data.rarity} Card</p>*/}
                            {/*    }*/}

                            {/*    { item.data && item.data.rarity && !item.data.description && item.data.type === 'Hero' &&*/}
                            {/*        <p>Dark Country {item.data.rarity} Hero</p>*/}
                            {/*    }*/}

                            {/*    { !item.data &&*/}
                            {/*        <p>description</p>*/}
                            {/*    }*/}
                            {/*</div>*/}

                            <div className={'listed-item-info-buy'}>
                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-seller'}>S</div>
                                    <Link to={ item.seller ? `/profile/${item.seller}` : ''}>
                                        <p>@seller - { item.seller ? item.seller : 'seller' }</p>
                                    </Link>
                                </div>

                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-buyer'}>B</div>
                                    <Link to={ item.user ? `/profile/${item.user}` : ''}>
                                        <p>@buyer - { item.user ? shortEthAddres(item.user) : 'buyer' }</p>
                                    </Link>
                                </div>

                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-creator'}>C</div>
                                    <p>@creator -
                                        {item.buy && item.buy.data && item.buy.data.properties && item.buy.data.properties.collection && item.buy.data.properties.collection.name && item.buy.data.properties.collection.name}
                                        {item.sell && item.sell.data && item.sell.data.properties && item.sell.data.properties.collection && item.sell.data.properties.collection.name && item.sell.data.properties.collection.name}
                                    </p>
                                </div>

                                <p className={'price'}>Price:
                                    {/*{ item.buy && item.buy.data && item.buy.data.quantity && item.buy && item.buy.data && weiToEth(item.buy.data.quantity)}*/}
                                    { item.sell && item.sell.data && item.sell.data.quantity && item.sell && item.sell.data && weiToEth(item.sell.data.quantity)} ETH
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*<ItemPriceGrid*/}
                    {/*    templateId={ item.item_template_id }*/}
                    {/*    collection={ item.collection }*/}
                    {/*/>*/}
                </>
            }
        </div>
    );
}
