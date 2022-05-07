import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

import './ListedItem.scss';

import DcLogo2 from "../../resources/images/logos/dc-logo2.webp";

import CustomButton from "../../generics/CustomButton/CustomButton";

import Loader from "../../components/Loader/Loader";
import ListedItemLoadingPlaceholder from "../../components/LoadingPlaceholders/ListedItemLoadingPlaceholder/ListedItemLoadingPlaceholder";
import ItemPriceGrid from "../../components/ItemPriceGrid/ItemPriceGrid";

import { SALE_ORDERS_API, OPEN_SUCCESS_PURCHASE_POPUP } from "../../constants";
import { buyMarketItem, removeMarketItem } from "../../flow";
import { renderDarkCountryItemImageOrVideo, showErrorMessage } from "../../helpers";

const INITIAL_ITEM_STATUS = 'INITIAL_ITEM_STATUS';
const BUY_ITEM_STATUS = 'BUY_ITEM_STATUS';
const CANCEL_ITEM_STATUS = 'CANCEL_ITEM_STATUS';

export default function ListedItem({ history, match: { params: { id } } }) {
    const [item, setItem] = useState({});
    const [processing, setProcessing] = useState(false);
    const [itemStatus, setItemStatus] = useState(INITIAL_ITEM_STATUS);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const { userItems } = useSelector(({ user }) => user);

    useEffect(() => { document.documentElement.scrollTop = 0 }, []);
    useEffect(() => {
        const fetchItem = () => {
            axios.get(`${SALE_ORDERS_API}?itemID=${id}&statusMsg=sale`)
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

    const handleBuyMarketItem = () => {
        setProcessing(true);

        buyMarketItem({
            saleItemID: id,
            marketCollectionAddress: item.seller
        })
            .then(() => {
                //use set timeout here because cron listens event every 10 seconds
                setTimeout(() => {
                    setProcessing(false)
                    dispatch({ type: OPEN_SUCCESS_PURCHASE_POPUP });
                }, 5000);
            })
            .catch(error => {
                console.log(error);
                setProcessing(false);
                showErrorMessage(error);
            });
    };

    const removeItemFromSale = (itemId) => {
        setProcessing(true);

        removeMarketItem({ itemId })
            .then(() => {
                setTimeout(() => {
                    toast.success('Removed from sale');
                    setProcessing(false);

                    history.push('/market');
                }, 3000);
            })
            .catch(e => {
                console.log(e);
                showErrorMessage(e);
                setProcessing(false);
            });
    };

    return (
        <div className={'listed-item-wrapper'}>
            { loading
                ? <ListedItemLoadingPlaceholder />
                : <>
                    <div className={'listed-item-container'}>
                        <div className={'listed-item-image'}>
                            { item.data && renderDarkCountryItemImageOrVideo(
                                item.data.ipfs, item.data.mediaUrl, item.data.name, true,
                                {
                                    width: 'max-content',
                                    height: 'auto',
                                    style: { display: 'flex', alignItems: 'center' }
                                }
                            ) }
                        </div>

                        <div className={'listed-item-info'}>
                            <p className={'item-description'}>{ item.data ? item.data.name : '' }</p>
                            <p className={'mint-info'}>ItemID - { item.item_id }</p>

                            <div className={'category'}>
                                <img src={DcLogo2} alt="category" />
                                { item.data && item.data.description &&
                                    <p>{ item.data.description }</p>
                                }

                                { item.data && item.data.rarity && !item.data.description && item.data.type === 'Card' &&
                                <p>Dark Country {item.data.rarity} Card</p>
                                }

                                { item.data && item.data.rarity && !item.data.description && item.data.type === 'Hero' &&
                                <p>Dark Country {item.data.rarity} Hero</p>
                                }

                                { !item.data &&
                                    <p>description</p>
                                }
                            </div>

                            <div className={'listed-item-info-buy'}>
                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-seller'}>O</div>
                                    <Link to={ item.seller ? `/profile/${item.seller}` : ''}>
                                        <p>@owner - { item.seller ? item.seller : '' }</p>
                                    </Link>
                                </div>

                                <div className={'listed-item-owner'}>
                                    <div className={'name-icon bg-creator'}>C</div>
                                    <p>@creator - { item.collection ? item.collection : '' }</p>
                                </div>

                                <p className={'price'}>Price: { item.price } FLOW</p>
                                <div className={'listed-item-actions'}>
                                    { processing && <Loader /> }

                                    { !processing && !!item && itemStatus === BUY_ITEM_STATUS &&
                                        <>
                                            <CustomButton
                                                text={'Buy'}
                                                onClick={() => handleBuyMarketItem()}
                                                disabled={processing}
                                            />
                                            <div>
                                                <p>Collection fee: 2.5%</p>
                                                <p>Market fee: 2.5%</p>
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

                    <ItemPriceGrid
                        templateId={ item.item_template_id }
                        collection={ item.collection }
                    />
                </>
            }
        </div>
    );
}
