import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { forceVisible } from "react-lazyload";

import axios from "axios";

import { Button } from "@material-ui/core";

import CheckIcon from '../../resources/images/icons/check_icon.png'
import CopyIcon from '../../resources/images/icons/copy_icon.png';
import AvatarPlaceholder from '../../resources/images/placeholders/avatar_placeholder.png';
import Copied from '../../resources/svg/checkIcon';
import SearchIcon from "../../resources/images/icons/search_icon.png";

import './Profile.scss'

import ItemSellModal from "../../modals/ItemSellModal/ItemSellModal";
import TransferModal from "../../modals/TransferModal/TransferModal";

//import CustomButton from "../../generics/CustomButton/CustomButton";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";

import Item from "../../components/Item/Item";
import ItemsLoadingPlaceholder from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";

import { MARKET_NFT_API, SALE_STATUS, MARKET_USER_API, VERIFICATION_LEVEL_1 } from "../../constants";
import { readCollectionIds } from "../../flow";

const MY_ITEMS_BLOCK = 'My items';
const ITEMS = 'Items';
const ON_SALE_BLOCK = 'On sale'

const ITEMS_BLOCKS = [
    MY_ITEMS_BLOCK,
    ON_SALE_BLOCK
];

export default function Profile({ history, match: { params: { address } } }) {
    const [currentItemsBlock, setCurrentItemsBlock] = useState(ITEMS_BLOCKS[0]);
    const [sellModal, showSellModal] = useState(false);
    const [transferModal, showTransferModal] = useState(false);
    const [item, setItem] = useState(null);
    const [myItems, setMyItems] = useState([]);
    const [searchItems, setSearchItems] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [onSaleItems, setOnSaleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [user, setUser] = useState(null);
    const [userOwnProfile, setUserOwnProfile] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const [reRender, setReRender] = useState(false);

    const authUser = useSelector(({ auth }) => auth.auth);

    useEffect(() => {
        const fetchUser = () => {
            axios.get(`${MARKET_USER_API}?address=${address}`)
                .then(({ data }) => !!data ? setUser(data) : history.push('/'))
                .catch(e => console.log(e));
        };

        if (address !== currentAddress) {
            setCurrentAddress(address);
            fetchUser();
        }
    }, [address, currentAddress, history]);

    useEffect(() => {
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

        if (user && user.address)
            getUserItems(user.address);

    }, [user]);

    useEffect(() => {
        if (user && user.address && authUser.address)
            setUserOwnProfile(user.address === authUser.address);

    }, [user, authUser]);

    useEffect(() => {
        const handleItemsSearch = (value) => {
            if (value && value.length > 2) {
                if (currentItemsBlock === MY_ITEMS_BLOCK)
                    setSearchItems(myItems.filter(({ data: { name } }) => {
                        return name.toString().toLowerCase().startsWith(value.toString().toLowerCase());
                    }));

                if (currentItemsBlock === ON_SALE_BLOCK)
                    setSearchItems(onSaleItems.filter(({ data: { name } }) => {
                        return name.toString().toLowerCase().startsWith(value.toString().toLowerCase());
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

    const removeTransferredItemFromMyItems = () => {
        setSearchQuery('');
        setSearchItems(null);
        setMyItems(myItems.filter(({ item_id }) => item.item_id !== item_id));
        setReRender(true);
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
                    />);

            case ON_SALE_BLOCK:
                itemsToRender = searchItems ? searchItems : onSaleItems;

                return itemsToRender.map(item =>
                    <Item
                        item={ item }
                        userOwner={userOwnProfile}
                        hideButtons={!userOwnProfile}
                        key={item.item_id}
                    />);

            default:
                return <></>;
        }
    };

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
                                <p className={'text-center'}>{ user ? user.address : 'address' }</p>
                                { copiedAddress
                                    ? <Copied />
                                    : <img src={CopyIcon} alt="" />
                                }
                            </div>
                        </CopyToClipboard>
                        <div className={'follow-share-container'}>
                            {/*{ userOwnProfile*/}
                            {/*    ? <CustomButton*/}
                            {/*        text={'Edit Profile'}*/}
                            {/*        onClick={ () => history.push('/settings') }*/}
                            {/*    />*/}
                            {/*    :  <CustomButton*/}
                            {/*        text={'Follow'}*/}
                            {/*        onClick={ () => {} }*/}
                            {/*    />*/}
                            {/*}*/}

                            {/*<CustomButton*/}
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
                                )
                            }
                        </div>

                        <div className={'profile-search'}>
                            <CustomTextField
                                placeholder={'Search items'}
                                img={SearchIcon}
                                value={searchQuery}
                                onChange={({ target: { value } }) => setSearchQuery(value)}
                            />
                        </div>

                        { loading
                            ? <ItemsLoadingPlaceholder />
                            : <div className={'items-wrapper'}>
                                { renderItems() }
                            </div>
                        }
                    </div>
                </div>
            </div>

            <ItemSellModal
                visible={ sellModal }
                onClose={ () => showSellModal(false) }
                ipfs={ item && item.data && item.data.ipfs ? item.data.ipfs : '' }
                mediaUrl={ item && item.data && item.data.mediaUrl ? item.data.mediaUrl : '' }
                itemId={item ? item.item_id : null}
                moveItemToOnSaleBlock={moveItemToOnSaleBlock}
            />

            <TransferModal
                visible={transferModal}
                onClose={() => showTransferModal(false)}
                ipfs={ item && item.data && item.data.ipfs ? item.data.ipfs : '' }
                mediaUrl={ item && item.data && item.data.mediaUrl ? item.data.mediaUrl : '' }
                itemId={item ? item.item_id : null}
                removeTransferredItemFromMyItems={removeTransferredItemFromMyItems}
            />
        </>
    );
}
