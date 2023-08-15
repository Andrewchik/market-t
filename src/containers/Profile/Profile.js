import React, {useContext, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { forceVisible } from "react-lazyload";

import axios from "axios";

import { toast } from "react-toastify";
import { Button } from "@material-ui/core";

import CheckIcon from '../../resources/images/icons/check_icon.webp'
import CopyIcon from '../../resources/images/icons/copy_icon.webp';
import AvatarPlaceholder from '../../resources/images/placeholders/avatar_placeholder.webp';
import SearchIcon from "../../resources/images/icons/search_icon.webp";
import Copied from '../../resources/svg/checkIcon';

import './Profile.scss';

import Item from "../../components/Item/Item";
import IMXItem from "../../components/IMXItem/IMXItem";
import IMXOrderItem from "../../components/IMXItem/IMXOrderItem/IMXOrderItem";
import Loader from "../../components/Loader/Loader";
import BoughtSoldItem from "../../components/Item/BoughtSoldItem/BoughtSoldItem";
import ItemsLoadingPlaceholder from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";

import ItemSellModal from "../../modals/ItemSellModal/ItemSellModal";
import TransferModal from "../../modals/TransferModal/TransferModal";

import CustomButton from "../../generics/CustomButton/CustomButton";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";

import {
    MARKET_NFT_API,
    SALE_STATUS,
    MARKET_USER_API,
    VERIFICATION_LEVEL_1,
    HISTORY_STATS_API, IMMUTABLE_SANDBOX_API, NO_RAM, BILLED_CPU
} from "../../constants";

import { readCollectionIds, setup } from "../../flow";
import { showErrorMessage } from "../../helpers";
import {Link} from "@imtbl/imx-sdk";
import {UALContext} from "ual-reactjs-renderer";
import WaxItem from "../../components/WaxItem/WaxItem";
import {cancelSale, getBuyOffers, getMyItems, getSales, getSalesTableData} from "../../services/wax.service";

import BoughtSoldWaxItem from "../../components/WaxItem/BoughtSoldIWaxtem/BoughtSoldIWaxtem";
import BuyRamModal from "../../modals/BuyRamModal/BuyRamModal";
import BuyCPUModal from "../../modals/BuyCPUModal/BuyCPUModal";

const MY_ITEMS_BLOCK = 'My items';
const ITEMS = 'Items';
const ON_SALE_BLOCK = 'On sale';
const SOLD_ITEMS = 'Sold items';
const BOUGHT_ITEMS = 'Bought items';

const ITEMS_BLOCKS = [
    MY_ITEMS_BLOCK,
    ON_SALE_BLOCK,
    SOLD_ITEMS,
    BOUGHT_ITEMS
];

export default function  Profile({ history, match: { params: { address } } }) {
    const { activeUser } = useContext(UALContext);
    const [currentItemsBlock, setCurrentItemsBlock] = useState(ITEMS_BLOCKS[0]);
    const [sellModal, showSellModal] = useState(false);
    const [transferModal, showTransferModal] = useState(false);
    const [buyRamModal, showBuyRamModal] = useState(false);
    const [buyCPUModal, showCPUModal] = useState(false);
    const [item, setItem] = useState(null);
    const [myItems, setMyItems] = useState([]);
    const [waxItemsToSale, setWaxItemsToSale] = useState([]);
    const [waxItemsSoldBuy, setWaxItemsSoldBuy] = useState([]);
    const [myImxItems, setMyImxItems] = useState([]);
    const [myWaxItems, setMyWaxItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [imxActive, setImxActive] = useState([]);
    const [imxFilled, setImxFilled] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const [loadingBASItems, setLoadingBASItems] = useState(false); // BAS - bought and sold
    const [searchItems, setSearchItems] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [onSaleItems, setOnSaleItems] = useState([]);
    const [onSaleWaxItems, setOnWaxSaleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [user, setUser] = useState(null);
    const [userOwnProfile, setUserOwnProfile] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const [reRender, setReRender] = useState(false);
    const [selling, setSelling] = useState(false);

    const [errorRamText, setErrorRamText] = useState('');

    // const [saleId, setSaleId] = useState(false);

    const authUser = useSelector(({ auth }) => auth.auth);

    const link = new Link(process.env.SANDBOX_LINK_URL)

    useEffect(() => {
        if (!localStorage.getItem('metamask') && !activeUser){
            const fetchUser = () => {
                axios.get(`${MARKET_USER_API}?address=${address}`)
                    .then(({ data }) => !!data ? setUser(data) : history.push('/'))
                    .catch(e => console.log(e));
            };

            if (address !== currentAddress) {
                setCurrentAddress(address);
                fetchUser();
            }
        }

        if (localStorage.getItem('metamask') && !activeUser){
            const fetchUserMetaMask = () => {
                axios.get(`${IMMUTABLE_SANDBOX_API}/users/${address}`)
                    .then(data => setUser({address}))
                    .catch(err => {
                    if (err.response) {
                        history.push('/')
                    }else {
                        console.log(err)
                    }
                });
            };

            if (address !== currentAddress) {
                setCurrentAddress(address);
                fetchUserMetaMask();
            }
        }

        if (activeUser){
            const fetchUserWax = () => {
                try {
                    setUser(activeUser.accountName)
                }catch (err) {
                    if (err.response) {
                        history.push('/')
                    } else {
                        console.log(err)
                    }
                }
            }

            if (address !== currentAddress) {
                setCurrentAddress(address);
                fetchUserWax();
            }
        }

    }, [address, currentAddress, history, activeUser]);

    const fetchUserImxItems = (address) => {
        setLoading(true);
        if (address && address.length) {
            axios.get(`${IMMUTABLE_SANDBOX_API}/assets?user=${address}&sell_orders=true&collection=0xaf2945d065e19167524bec040bae292b5990fbb0`)
            .then(({data: {result}}) => {
                const filteredResult = result.filter(item => !item.hasOwnProperty('orders'));
                setMyImxItems(filteredResult);
            })
            .catch(error => {
                hideItems();
                console.log(error);
            })
            .finally(() => setLoading(false));
        
        } else {
            hideItems();
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('metamask')){
            const getUserItems = (address) => {
                setLoading(true);

                readCollectionIds({ address })
                    .then(ids => fetchUserItems(ids))
                    .catch(error => {
                        setLoading(false);
                        hideItems();
                        console.log(error);
                    });
            };

            const fetchUserItems = (ids) => {
                if (ids && ids.length) {
                    axios.get(`${MARKET_NFT_API}/user-nfts?itemIds=${ids.join(',')}`)
                        .then(({ data }) => groupItems(data))
                        .catch(error => {
                            hideItems();
                            console.log(error);
                        })
                        .finally(() => setLoading(false));
                } else {
                    hideItems();
                    setLoading(false);
                }
            };

            const fetchBoughtAndSoldItems = (address) => {
                setLoadingBASItems(true);

                axios.get(`${HISTORY_STATS_API}/bought-sold-items/${address}`)
                    .then(({ data: { boughtItems, soldItems } }) => {
                        setBoughtItems(boughtItems);
                        setSoldItems(soldItems)
                    })
                    .catch(e => console.log(e))
                    .finally(() => setLoadingBASItems(false))
            };

            if (user && user.address) {
                getUserItems(user.address);
                fetchBoughtAndSoldItems(user.address);
            }
        }

        

        if (localStorage.getItem('metamask')){
        


            const groupImxOrderItems = (imxOrderItems) => {
                let imxActive = imxOrderItems.filter((item) => {
                    return item.status === 'active'
                })

                let imxFilled = imxOrderItems.filter((item) => {
                    return item.status === 'filled'
                })

                setImxActive(imxActive)
                setImxFilled(imxFilled)
            }

            const fetchImxOrderItems = (address) => {
                setLoadingBASItems(true);

                axios.get(`${IMMUTABLE_SANDBOX_API}/orders?user=${address}`)
                    .then(({ data: { result } }) => {
                        groupImxOrderItems(result)
                    })
                    .catch(e => console.log(e))
                    .finally(() => setLoadingBASItems(false))
            }


            if (user && user.address) {
                fetchUserImxItems(user.address);
                fetchImxOrderItems(user.address);
            }
        }


    }, [user]);

 
        const fetchUserActiveImxItems = (address) => {
            setTimeout(() => {
                if (address && address.length) {
                    axios.get(`${IMMUTABLE_SANDBOX_API}/orders?user=${address}&status=active`)
                        .then(({data: {result}}) => {
                            setImxActive(result)

                            setTimeout(() => {
                                fetchUserImxItems(address)
                            }, 2000);
                        
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => setLoading(false));
                }
            }, 1500)
          
        };

        console.log(imxActive);



    useEffect(() => {
        const myItems = () => {
            getMyItems({ activeUser })
                .then((data) => {
                    const filteredItems = data.filter((item) => {
                        return !waxItemsToSale.some((saleItem) => {
                            return saleItem.asset_ids.some((asset) => asset.asset_id === item.asset_id);
                        });
                    });

                    setMyWaxItems(filteredItems);
                })
                .catch((error) => {
                    console.log(error);
                });
        };




        if (activeUser)
            myItems()

    }, [activeUser, waxItemsToSale])

    useEffect(() => {
        const getBuyOffersWax = () => {
            getBuyOffers()
                .then((data) => {
                    let newData = data.filter((item) => {
                        return item.buyer === activeUser?.accountName
                    })
                    setWaxItemsSoldBuy(newData)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        if (activeUser)
            getBuyOffersWax()

    }, [activeUser])

    useEffect(() => {
        const getOnSaleWaxItem = () => {
            getSales()
                .then((data) => {
                    const filteredData = data
                        .filter(item => item.seller === activeUser?.accountName)
                        .flat();


                    setWaxItemsToSale(filteredData);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        if (activeUser)
            getOnSaleWaxItem();

    }, [activeUser]);

    useEffect(() => {
        if (user && user.address && authUser.address){
            setUserOwnProfile(user.address === authUser.address);
        }

        if (user && user.address && localStorage.getItem('metamask')){
            let metamask = localStorage.getItem('metamask')
            let metamaskParse = JSON.parse(metamask)

            setUserOwnProfile(user.address === metamaskParse.address);
        }

        if(activeUser){
            setUserOwnProfile(user)
        }

    }, [user, authUser, activeUser]);

    useEffect(() => {
        const handleItemsSearch = (value) => {
            if (value && value.length > 2) {
                let itemsToFilter = [];

                if (currentItemsBlock === MY_ITEMS_BLOCK)
                    itemsToFilter = myItems;

                if (currentItemsBlock === ON_SALE_BLOCK)
                    itemsToFilter = onSaleItems;

                if (currentItemsBlock === BOUGHT_ITEMS)
                    itemsToFilter = boughtItems;

                if (currentItemsBlock === SOLD_ITEMS)
                    itemsToFilter = soldItems;

                setSearchItems(itemsToFilter.filter(({ data: { name } }) => {
                    return name.toString().toLowerCase().includes(value.toString().toLowerCase());
                }));

                return setReRender(!reRender);
            }

            if (!!searchItems) {
                setSearchItems(null);
                setReRender(!reRender);
            }
        };

        handleItemsSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => forceVisible(), [reRender]);

    const hideItems = () => {
        setMyItems([]);
        setOnSaleItems([]);
    };

    const handlerCanselItemFromListing = (orderId) => {
        link.cancel({
            orderId: orderId,
        })
            .then(() => {
                toast.success('Removed from sale');
                fetchUserActiveImxItems(user.address)
            })
            .catch(e => {

                showErrorMessage(e);

                console.log(e);
            })
            .finally(() => setSelling(false));
    }

    const handlerCanselWaxItemFromListing = (sale_id) => {
        cancelSale({ activeUser, sale_id }).then(() => {
            toast.success('Removed from sale');
            getSalesTableData();

            let updWaxItemsToSale = waxItemsToSale.filter(item => item.sale_id !== sale_id);
            setWaxItemsToSale(updWaxItemsToSale);
        })
            .catch(e => {
                showErrorMessage(e);
                console.log(e);

                if (e && e.toString().includes(BILLED_CPU)) {
                    showCPUModal(true)
                }

                
                if (e && e.toString().includes(NO_RAM)){
                    showBuyRamModal(true)
                }
           
            })
            .finally(() => setSelling(false));
    }

    const groupItems = (items) => {
        const userOnSaleItems = items.filter(item => item.status_msg && item.status_msg === SALE_STATUS);
        const userItems = items.filter(item => !item.status_msg || item.status_msg !== SALE_STATUS);

        setMyItems(userItems);
        setOnSaleItems(userOnSaleItems);
    };

    const moveItemToOnSaleBlock = (price) => {
        setMyItems(myItems.filter(({ item_id }) => item.item_id !== item_id));
        setOnSaleItems([...onSaleItems, { ...item, price, status_msg: SALE_STATUS }]);
    };

    const moveImxItemToOnSaleBlock = (price) => {
        setMyImxItems(myImxItems.filter(({ id }) => item.id !== id));
        console.log(item);
        // setImxActive([...imxActive, { ...imxActive, price, status_msg: SALE_STATUS }]);
    };


    console.log(myImxItems);

    const moveWaxItemToOnSaleBlock = (price) => {
        setMyWaxItems(myWaxItems.filter(({ asset_id }) => item.asset_id !== asset_id));
        setOnWaxSaleItems([...onSaleWaxItems, { ...item, price, status_msg: SALE_STATUS }]);
    };


    const removeTransferredItemFromMyItems = () => {
        setSearchQuery('');
        setSearchItems(null);
        setMyItems(myItems.filter(({ item_id }) => item.item_id !== item_id));
        setReRender(true);
    };

    const handleUnpackClick = () => {
        window.open("https://flow.darkcountry.io/unpacker/land", '_blank', 'noopener,noreferrer');
    };

    const renderItems = () => {
        let itemsToRender = [];

        switch (currentItemsBlock) {
            case MY_ITEMS_BLOCK:
                itemsToRender = searchItems ? searchItems : myItems;

                return itemsToRender.map(item =>
                            <Item
                                item={item}
                                showSellButton={true}
                                showSellModal={() => {
                                    setItem(item);
                                    showSellModal(true)
                                }}
                                showTransferModal={() => {
                                    setItem(item);
                                    showTransferModal(true);
                                }}
                                userOwner={userOwnProfile}
                                hideButtons={!userOwnProfile}
                                key={item.item_id}
                                handleUnpackClick={handleUnpackClick}
                                isLandPack={item.data.type.toLowerCase() === 'pack'}
                            />
                )

            case ON_SALE_BLOCK:
                itemsToRender = searchItems ? searchItems : onSaleItems;

                return itemsToRender.map(item =>
                    <Item
                        item={ item }
                        userOwner={userOwnProfile}
                        hideButtons={!userOwnProfile}
                        key={item.item_id}
                    />
                );

            case BOUGHT_ITEMS:
                itemsToRender = searchItems ? searchItems : boughtItems;

                return itemsToRender.map(item =>
                    <BoughtSoldItem
                        item={item}
                        userOwnProfile={userOwnProfile}
                        key={ item.bought_timestamp }
                    />
                );

            case SOLD_ITEMS:
                itemsToRender = searchItems ? searchItems : soldItems;

                return itemsToRender.map(item =>
                    <BoughtSoldItem
                        item={item}
                        userOwnProfile={userOwnProfile}
                        key={item.bought_timestamp}
                    />
                );

            default:
                return <></>;
        }
    };

    const renderImxItems = () => {
        let itemsToRender = [];

        switch (currentItemsBlock) {
            case MY_ITEMS_BLOCK:
                itemsToRender = searchItems ? searchItems : myImxItems;
                console.log(item);
                return itemsToRender.map((item) =>
                    <IMXItem
                        item={item}
                        showSellButton={true}
                        showSellModal={() => {
                            setItem(item);
                            showSellModal(true)
                        }}
                        showTransferModal={() => {
                            setItem(item);
                            showTransferModal(true);
                        }}
                        userOwner={userOwnProfile}
                        hideButtons={!userOwnProfile}
                        // handleUnpackClick={handleUnpackClick}
                        // isLandPack={item.data.type.toLowerCase() === 'pack'}
                    />
                )

            case ON_SALE_BLOCK:
                itemsToRender = searchItems ? searchItems : imxActive;

                return itemsToRender.map((item) => {
                    console.log(item);
                  
                    return (
                        <IMXItem
                        item={item?.sell?.data?.properties}
                        userOwner={userOwnProfile}
                        hideButtons={!userOwnProfile}
                        itemOnSale={userOwnProfile}
                        handlerCanselItemFromListing={handlerCanselItemFromListing}
                        orderId={item.order_id}
                    />
                    )
                }
                );

            case BOUGHT_ITEMS:
                itemsToRender = searchItems ? searchItems : imxFilled;

                return itemsToRender.map((item, imx) =>
                    <IMXOrderItem
                        item={item}
                        userOwnProfile={userOwnProfile}
                        key={ imx }
                    />
                );


            default:
                return <></>;
        }
    };

    const renderWaxItems = () => {
        let itemsToRender = [];

        switch (currentItemsBlock) {
            case MY_ITEMS_BLOCK:
                itemsToRender = searchItems ? searchItems : myWaxItems;

                if (Array.isArray(itemsToRender)) {
                    return itemsToRender.map(item =>
                        <WaxItem
                            item={item}
                            showSellButton={true}
                            showSellModal={() => {
                                setItem(item);
                                showSellModal(true)
                            }}
                            showTransferModal={() => {
                                setItem(item);
                                showTransferModal(true);
                            }}
                            showBuyRamModal={() => {
                                setItem(item);
                                showBuyRamModal(true);
                            }}
                            userOwner={userOwnProfile}
                            hideButtons={!userOwnProfile}
                            key={item.item_id}
                            handleUnpackClick={handleUnpackClick}
                        />
                    );
                }

                break;

            case ON_SALE_BLOCK:
                itemsToRender = searchItems ? searchItems : waxItemsToSale;

                if (Array.isArray(itemsToRender)) {
                    return itemsToRender.map((item) => {
                            return (
                                <WaxItem
                                    item={item.asset_ids[0]}
                                    userOwner={userOwnProfile}
                                    hideButtons={!userOwnProfile}
                                    itemOnSale={userOwnProfile}
                                    handlerCanselWaxItemFromListing={handlerCanselWaxItemFromListing}
                                    sale_id={item.sale_id}
                                />
                            )
                    }

                    );
                }

                break;

            case BOUGHT_ITEMS:
                itemsToRender = searchItems ? searchItems : waxItemsSoldBuy;

                if (Array.isArray(itemsToRender)) {
                    return itemsToRender.map(item =>
                        <BoughtSoldWaxItem
                            item={item}
                            userOwnProfile={userOwnProfile}
                        />
                    );
                }

            case SOLD_ITEMS:
                itemsToRender = searchItems ? searchItems : waxItemsSoldBuy;

                if (Array.isArray(itemsToRender)) {
                    return itemsToRender.map(item =>
                        <BoughtSoldWaxItem
                            item={item}
                            userOwnProfile={userOwnProfile}
                            SOLD_ITEMS={SOLD_ITEMS}
                        />
                    );
                }
            default:
                return <></>;
        }

    };

    const handleSetup = () => {
        setProcessing(true);

        setup()
            .then(() => toast.success('Success'))
            .catch(error => showErrorMessage(error))
            .finally(() => setProcessing(false));
    }

    return (
        <>
            <div className={'profile-wrapper'}>
                <div className={'profile-bg'}>
                    <div className={'profile-icon'}>
                        <img src={ AvatarPlaceholder } alt=""/>
                        { user && user.verification_level === VERIFICATION_LEVEL_1 &&
                            <div className={'check-icon'}>
                                <img src={ CheckIcon } alt=""/>
                            </div>
                        }
                    </div>
                </div>

                <div className={'profile-content'}>
                    <div className={'profile-info'}>
                        {/*<p className={'text-center username-title'}>Username</p>*/}
                        <CopyToClipboard
                            text={user ? user.address : ''}
                            onCopy={() => setCopiedAddress(true)}
                        >

                                <div className={'wallet-name'}>
                                    {activeUser ?
                                        <p>{activeUser.accountName}</p>
                                        :
                                        <p className={'text-center'}>{ user ? user.address : 'address' }</p>
                                    }

                                    { copiedAddress
                                        ? <Copied />
                                        : <img src={CopyIcon} alt="" />
                                    }
                                </div>

                            {/*{localStorage.getItem('metamask') &&*/}
                            {/*    <div className={'wallet-name'}>*/}
                            {/*        <p className={'text-center'}>address</p>*/}
                            {/*        { copiedAddress*/}
                            {/*            ? <Copied />*/}
                            {/*            : <img src={CopyIcon} alt="" />*/}
                            {/*        }*/}
                            {/*    </div>*/}
                            {/*}*/}

                        </CopyToClipboard>

                        <div className={'follow-share-container'}>
                            {/*{ userOwnProfile*/}
                            {/*    ? <CustomSecondButton*/}
                            {/*        text={'Edit Profile'}*/}
                            {/*        onClick={ () => history.push('/settings') }*/}
                            {/*    />*/}
                            {/*    :  <CustomSecondButton*/}
                            {/*        text={'Follow'}*/}
                            {/*        onClick={ () => {} }*/}
                            {/*    />*/}
                            {/*}*/}

                            { userOwnProfile && !activeUser &&
                                <>
                                    { processing
                                        ? <Loader />
                                        :  <CustomButton
                                            text={'Setup'}
                                            onClick={handleSetup}
                                            disabled={processing}
                                        />
                                    }
                                </>
                            }

                            {/*<CustomSecondButton*/}
                            {/*    text={'Share'}*/}
                            {/*    onClick={ () => {} }*/}
                            {/*    borderButton={ true }*/}
                            {/*/>*/}
                        </div>
                    </div>

                    <div className={'profile-assets'}>
                        <div className={'asset-status-switch'}>
                            { ITEMS_BLOCKS.map(itemBlock =>
                                <Button
                                    className={ currentItemsBlock === itemBlock ? 'selected-button' : '' }
                                    onClick={ () => {
                                        setCurrentItemsBlock(itemBlock);
                                        setSearchQuery('');
                                        setSearchItems(null);
                                    } }
                                    key={itemBlock}
                                >
                                    { itemBlock === MY_ITEMS_BLOCK && !userOwnProfile ? ITEMS : itemBlock }
                                </Button>
                            ) }
                        </div>

                        <div className={'profile-search'}>
                            <CustomTextField
                                placeholder={'Search items'}
                                img={SearchIcon}
                                value={searchQuery}
                                onChange={({ target: { value } }) => setSearchQuery(value)}
                            />
                        </div>

                        { loading || loadingBASItems
                            ? <ItemsLoadingPlaceholder />
                            : <div className={'items-wrapper'}>
                                {!localStorage.getItem('metamask') && !activeUser && renderItems() }
                                {localStorage.getItem('metamask') && !activeUser && renderImxItems() }
                                {activeUser && renderWaxItems()}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <ItemSellModal
                visible={ sellModal }
                showBuyRamModal={showBuyRamModal}
                onClose={ () => showSellModal(false) }
                ipfs={ item && item.data && item.data.ipfs ? item.data.ipfs : '' }
                mediaUrl={ item && item.data && item.data.mediaUrl ? item.data.mediaUrl : '' }
                itemId={item ? item.item_id : null}
                moveItemToOnSaleBlock={moveItemToOnSaleBlock}
                moveWaxItemToOnSaleBlock={moveWaxItemToOnSaleBlock}
                moveImxItemToOnSaleBlock={moveImxItemToOnSaleBlock}
                imxItemUrl={item && item.image_url ? item.image_url : ''}
                token_address={item && item.token_address ? item.token_address : ''}
                token_id={item && item.token_id ? item.token_id : ''}
                asset_ids={item && item.asset_id ? item.asset_id : ''}
                mediaWaxUrl={ item && item.data ? item.data.img : '' }
                setWaxItemsToSale={setWaxItemsToSale}
                setErrorRamText={setErrorRamText}
                showCPUModal={showCPUModal}
                setMyWaxItems={setMyWaxItems}
                myWaxItems={myWaxItems}
                onUpdateImxActive={() =>  fetchUserActiveImxItems(user.address)}
            />

            <TransferModal
                visible={transferModal}
                onClose={() => showTransferModal(false)}
                ipfs={ item && item.data && item.data.ipfs ? item.data.ipfs : '' }
                mediaUrl={ item && item.data && item.data.mediaUrl ? item.data.mediaUrl : '' }
                itemId={item ? item.item_id : null}
                removeTransferredItemFromMyItems={removeTransferredItemFromMyItems}
                imxItemUrl={item && item.metadata && item.metadata.image_url ? item.metadata.image_url : ''}
                token_address={item && item.token_address ? item.token_address : ''}
                token_id={item && item.token_id ? item.token_id : ''}
                asset_id={item && item.asset_id ? item.asset_id : ''}
            />

            <BuyRamModal
                visible={buyRamModal}
                onClose={() => showBuyRamModal(false)}
                errorRamText={errorRamText}
            />
            
            <BuyCPUModal
             visible={buyCPUModal}
             onClose={() => showCPUModal(false)}
            />
        </>
    );
}
