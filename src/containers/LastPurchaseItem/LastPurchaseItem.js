import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

import axios from "axios";

import { MARKET_PURCHASE_API } from "../../constants";

import ListedItemLoadingPlaceholder from "../../components/LoadingPlaceholders/ListedItemLoadingPlaceholder/ListedItemLoadingPlaceholder";

import DcLogo2 from "../../resources/images/dc-logo2.png";

import './LastPurchaseItem.scss';
import '../ListedItemContainer/ListedItemContainer.scss';

function LastPurchaseItem({ history, match: { params: { id } } }) {
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
                        <ReactPlayer
                            url={ item.data ?  `https://ipfs.io/ipfs/${item.data.ipfs}` : '' }
                            playing={true}
                            loop={true}
                            width={'max-content'}
                            height={'auto'}
                        />
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
                                <p onClick={() => item.seller ? history.push(`/profile/${item.seller}`) : {} }>
                                    @seller - { item.seller ? item.seller : 'seller' }
                                </p>
                            </div>
                            <div className={'listed-item-owner'}>
                                <div className={'name-icon bg-buyer'}>B</div>
                                <p onClick={() => item.buyer ? history.push(`/profile/${item.buyer}`) : {} }>
                                    @buyer - { item.buyer ? item.buyer : 'buyer' }
                                </p>
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

export default LastPurchaseItem;