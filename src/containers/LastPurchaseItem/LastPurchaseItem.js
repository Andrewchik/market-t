import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { MARKET_PURCHASE_API } from "../../constants";

import ListedItemLoadingPlaceholder from "../../components/LoadingPlaceholders/ListedItemLoadingPlaceholder/ListedItemLoadingPlaceholder";

import DcLogo2 from "../../resources/images/logos/dc-logo2.png";

import './LastPurchaseItem.scss';
import '../ListedItem/ListedItem.scss';

import { renderDarkCountryItemImageOrVideo } from "../../helpers";

import { renderDarkCountryItemImageOrVideo } from "../../helpers";

export default function LastPurchaseItem({ history, match: { params: { id } } }) {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = () => {
            axios.get(`${MARKET_PURCHASE_API}?id=${id}`)
                .then(({ data }) => !!data ? setItem(data) : history.push('/market'))
                .catch(error => { console.log(error) })
                .finally(() => setLoading(false));
        };

        fetchItem();
    }, [id, history]);

    return (
        <div className={'listed-item-wrapper'}>
            { loading
                ? <ListedItemLoadingPlaceholder />
                : <div className={'listed-item-container'}>
                    <div className={'listed-item-image'}>
                        { item.data && renderDarkCountryItemImageOrVideo(
                            item.data.ipfs, item.data.mediaUrl, item.data.name, true,
                            { width: 'max-content', height: 'auto', style: { display: 'flex', alignItems: 'center' } }
                        ) }
                    </div>
                    <div className={'listed-item-info'}>
                        <p className={'item-description'}>{ item.data ? item.data.name : 'name' }</p>
                        <p className={'mint-info'}>ItemID - { item.item_id }</p>
                        <div className={'category'}>
                            <img src={DcLogo2} alt="category" />
                            <p>{ item.data ? item.data.description : 'description' }</p>
                        </div>
                        <div className={'listed-item-info-buy'}>
                            <div className={'listed-item-owner'}>
                                <div className={'name-icon bg-seller'}>S</div>
                                <Link to={ item.seller ? `/profile/${item.seller}` : ''}>
                                    <p>@seller - { item.seller ? item.seller : 'seller' }</p>
                                </Link>
                            </div>
                            <div className={'listed-item-owner'}>
                                <div className={'name-icon bg-buyer'}>B</div>
                                <Link to={ item.buyer ? `/profile/${item.buyer}` : ''}>
                                    <p>@buyer - { item.buyer ? item.buyer : 'buyer' }</p>
                                </Link>
                            </div>
                            <div className={'listed-item-owner'}>
                                <div className={'name-icon bg-creator'}>C</div>
                                <p>@creator - { item.collection ? item.collection : 'creator' }</p>
                            </div>
                            <p className={'price'}>Price: { item.price } FLOW</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
