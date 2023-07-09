import React, {useContext, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import './ListedWAXItem.scss';

import DcLogo2 from "../../resources/images/logos/dc-logo2.webp";

import CustomButton from "../../generics/CustomButton/CustomButton";

import Loader from "../../components/Loader/Loader";
import ListedItemLoadingPlaceholder from "../../components/LoadingPlaceholders/ListedItemLoadingPlaceholder/ListedItemLoadingPlaceholder";

import { OPEN_SUCCESS_PURCHASE_POPUP } from "../../constants";

import { showErrorMessage } from "../../helpers";
import {buyItem, cancelSale, getSalesTableData} from "../../services/wax.service";
import Slider from "../../components/Slider/Slider";

import {ATOMIC_ASSETS_API} from '../../constants'
import {UALContext} from "ual-reactjs-renderer";

const INITIAL_ITEM_STATUS = 'INITIAL_ITEM_STATUS';
const BUY_ITEM_STATUS = 'BUY_ITEM_STATUS';
const CANCEL_ITEM_STATUS = 'CANCEL_ITEM_STATUS';


export default function ListedWAXItem({ history, match: { params: { id } } }) {

    const { activeUser } = useContext(UALContext);
    const [item, setItem] = useState({});
    const [processing, setProcessing] = useState(false);
    const [itemStatus, setItemStatus] = useState(INITIAL_ITEM_STATUS);
    const [listedItems, setListedItems] = useState([])
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => { document.documentElement.scrollTop = 0 }, []);
    useEffect(() => {
        const fetchItem = () => {
            getSalesTableData()
                .then((data) => {
                    if (!!data) {
                        const selectedSale = data.find(sale => sale.sale_id === Number(id));
                        if (selectedSale) {
                            setItem(selectedSale);
                        } else {
                            history.push('/market?blockchain=WAX');
                        }
                    } else {
                        history.push('/market?blockchain=WAX');
                    }
                })
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        };

        fetchItem();
    }, [id, history]);

    useEffect(() => {
        const fetchAssets = async () => {
            const assetIds = item.asset_ids.join(',');
            const url = `${ATOMIC_ASSETS_API}/assets?ids=${assetIds}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const {data} = await response.json();
                    // Обробка отриманих даних про активи
                    setListedItems(data);
                } else {
                    console.log('Помилка під час отримання даних про активи');
                }
            } catch (error) {
                console.log('Помилка під час виконання запиту:', error);
            }
        };

        if (item.asset_ids && item.asset_ids.length > 0) {
            fetchAssets();
        }
    }, [item.asset_ids]);


    useEffect(() => {
        if (item && activeUser){
            const userOwner = item.seller === activeUser.accountName ? CANCEL_ITEM_STATUS : BUY_ITEM_STATUS;
            setItemStatus(userOwner);
        }
    }, [item, activeUser]);

    const handleBuyMarketItem = () => {
        setProcessing(true);

        buyItem({
            activeUser, item
        })
            .then(() => {
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

    const removeItemFromSale = (sale_id) => {
        setProcessing(true);

        cancelSale({ activeUser, sale_id })
            .then(() => {
                setTimeout(() => {
                    toast.success('Removed from sale');
                    setProcessing(false);

                    history.push('/market?blockchain=WAX');
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
                            <Slider listedItems={listedItems} />
                        </div>
                        <div className={'listed-item-info'}>
                            <p className={'item-description'}>{ item.data ? item.data.name : '' }</p>
                            <p className={'mint-info'}>SaleID - { item.sale_id }</p>

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
                                    <p>Darkcountry</p>
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
                                    <p>@creator - { item.collection_name ? item.collection_name : '' }</p>
                                </div>

                                <p className={'price'}>Price: { item.listing_price } </p>
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
                                                <p>Collection fee: {(Number(item.collection_fee * 100)).toFixed(2) + '%'}</p>
                                                {/* <p>Taker market fees: {(Number(config.taker_market_fee * 100)).toFixed(2) + '%'}</p>
                                                <p>Maker market fees: {(Number(config.maker_market_fee * 100)).toFixed(2) + '%'}</p> */}
                                            </div>
                                        </>
                                    }

                                    { !processing && !!item && itemStatus === CANCEL_ITEM_STATUS &&
                                        <CustomButton
                                            text={'Cancel'}
                                            onClick={ () => removeItemFromSale(item.sale_id) }
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
