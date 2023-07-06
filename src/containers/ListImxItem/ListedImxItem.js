import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {Link as IMXLink} from "@imtbl/imx-sdk";

import { toast } from "react-toastify";

import axios from "axios";

import './ListedImxItem.scss';


import CustomButton from "../../generics/CustomButton/CustomButton";

import Loader from "../../components/Loader/Loader";
import ListedItemLoadingPlaceholder from "../../components/LoadingPlaceholders/ListedItemLoadingPlaceholder/ListedItemLoadingPlaceholder";


import {
    IMMUTABLE_SANDBOX_API,
} from "../../constants";
import { showErrorMessage } from "../../helpers";
import {ethers} from "ethers";

const INITIAL_ITEM_STATUS = 'INITIAL_ITEM_STATUS';
const BUY_ITEM_STATUS = 'BUY_ITEM_STATUS';
const CANCEL_ITEM_STATUS = 'CANCEL_ITEM_STATUS';

export default function ListedImxItem({ history, match: { params: { id } } }) {
    const [item, setItem] = useState({});
    const [processing, setProcessing] = useState(false);
    const [itemStatus, setItemStatus] = useState(INITIAL_ITEM_STATUS);
    const [loading, setLoading] = useState(true);
    const [selling, setSelling] = useState(false);

    const link = new IMXLink(process.env.SANDBOX_LINK_URL)

    const { userItems } = useSelector(({ user }) => user);

    useEffect(() => { document.documentElement.scrollTop = 0 }, []);
    useEffect(() => {
        const fetchItem = () => {
            axios.get(`${IMMUTABLE_SANDBOX_API}/orders/${id}`)
                .then(({ data }) => !!data ? setItem(data) : history.push('/market'))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        };

        fetchItem();
    }, [id, history]);

    useEffect(() => {
        if (item && userItems)
            setItemStatus(userItems.includes(item.item_id) ? CANCEL_ITEM_STATUS : BUY_ITEM_STATUS);
    }, [item, userItems]);

    // const handleBuyMarketItem = () => {
    //     setProcessing(true);
    // };

    const removeItemFromSale = (itemId) => {
        setProcessing(true);
    }

    const shortEthAddres = (address) => {
        if (typeof address === "string")
            return "0x" + address.substring(0, 4) + "..." + address.substring(36);
    }


    // const sighOut = () => {
    //     fcl.unauthenticate();
    //
    //     dispatch({
    //         type: AUTH_LOGOUT_SUCCESS
    //     });
    //
    //     dispatch({
    //         type: USER_ITEMS_IDS_SUCCESS,
    //         payload: []
    //     });
    // }


    async function handleBuyMarketImxItem(id) {

        // if (localStorage.getItem('metamask'))
            await link.buy({ orderIds: [id] })
                .then(() => {
                    toast.success('Congratulations on your purchase');
                })
                .catch(e => {
                    showErrorMessage(e);
                    console.log(e);

                    if(e === undefined){
                        toast.warning('Sorry, but you have to deposit some tokens');
                    }

                })
                .finally(() => setSelling(false));

        // if (!localStorage.getItem('metamask'))
        //     await link.buy({ orderIds: [id] })
    }

    return (
        <div className={'listed-item-wrapper'}>
            { loading
                ? <ListedItemLoadingPlaceholder />
                : <>
                    <div className={'listed-item-container'}>
                        <div className={'listed-item-image'}>
                            {item.sell && item.sell.data && item.sell.data.properties && item.sell.data.properties.image_url && (
                                <img src={item.sell.data.properties.image_url} alt=""/>
                            )}

                            {item.buy && item.buy.data && item.buy.data.properties && item.buy.data.properties.image_url && (
                                <img src={item.buy.data.properties.image_url} alt=""/>
                            )}


                        </div>

                        <div className={'listed-item-info'}>
                            <p className={'item-description'}>{ item.sell.data.properties ? item.sell.data.properties.name : '' }</p>
                            <p className={'mint-info'}>OrderID - { item.order_id }</p>

                            {/*<div className={'category'}>*/}
                            {/*    <img src={DcLogo2} alt="category" />*/}
                            {/*    { item.data && item.data.description &&*/}
                            {/*        <p>{ item.data.description }</p>*/}
                            {/*    }*/}

                            {/*    { item.data && item.data.rarity && !item.data.description && item.data.type === 'Card' &&*/}
                            {/*    <p>Dark Country {item.data.rarity} Card</p>*/}
                            {/*    }*/}

                            {/*    { item.data && item.data.rarity && !item.data.description && item.data.type === 'Hero' &&*/}
                            {/*    <p>Dark Country {item.data.rarity} Hero</p>*/}
                            {/*    }*/}

                            {/*    { !item.data &&*/}
                            {/*        <p>description</p>*/}
                            {/*    }*/}
                            {/*</div>*/}

                            <div className={'listed-item-info-buy'}>
                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-seller'}>O</div>
                                    <Link to={ item.user ? `/profile/${item.user}` : ''}>
                                        <p>@owner - { item.user ? shortEthAddres(item.user) : '' }</p>
                                    </Link>
                                </div>

                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-creator'}>C</div>
                                    {item.sell && item.sell.data && item.sell.data.properties && item.sell.data.properties.collection && item.sell.data.properties.collection.name && (
                                        <p>@creator - { item.sell.data.properties.collection.name }</p>
                                    )}

                                    {item.buy && item.buy.data && item.buy.data.properties && item.buy.data.properties.collection && item.buy.data.properties.collection.name && (
                                        <p>@creator - { item.buy.data.properties.collection.name }</p>
                                    )}

                                </div>

                                {item.sell && item.sell.data && item.sell && item.sell.data.quantity > 1 && (
                                    <p className={'price'}>Price: {ethers.utils.formatEther(item.sell.data.quantity)} ETH</p>
                                )}

                                {item.buy && item.buy.data && item.buy.data.quantity > 1 && (
                                    <p className={'price'}>Price: {ethers.utils.formatEther(item.buy.data.quantity)} ETH</p>
                                )}

                                <div className={'listed-item-actions'}>
                                    { processing && <Loader /> }

                                    { !processing && !!item && itemStatus === BUY_ITEM_STATUS &&
                                        <>
                                                <CustomButton
                                                    text={'Buy'}
                                                    onClick={() => handleBuyMarketImxItem(id)}
                                                    disabled={processing}
                                                />

                                            <div>
                                                <p>Protocol fee 2%</p>
                                                <p>Royalties to creator 0%</p>
                                                <p>Marketplace fee 1%</p>
                                            </div>
                                        </>
                                    }

                                    { !processing && !!item && itemStatus === CANCEL_ITEM_STATUS &&
                                        <CustomButton
                                            text={'Cancel'}
                                            onClick={ () => removeItemFromSale(item.item_id) }
                                            disabled={processing}
                                        />
                                    }
                                </div>
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
