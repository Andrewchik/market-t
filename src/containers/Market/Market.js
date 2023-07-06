import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {forceVisible} from "react-lazyload";
import {StringParam, useQueryParam} from 'use-query-params';

import axios from "axios";

import "./Market.scss";

import MarketFilters from "../../components/MarketFilters/MarketFilters";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomSelect from "../../generics/CustomSelect/CustomSelect";
import Item from "../../components/Item/Item";

import ItemsLoadingPlaceholder
    from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";

import SearchIcon from "../../resources/images/icons/search_icon.webp";

import {
    DARKCOUNTRY_COLLECTION,
    IMMUTABLE_SANDBOX_API,
    LISTINGS_ASC,
    LISTINGS_DESC,
    PRICE_ASC,
    PRICE_DESC,
    SALE_ORDERS_API,
} from "../../constants";

import {getDCschemas, getSales} from "../../services/wax.service";
import WaxItemToSell from "../../components/WaxItemToSell/WaxItemToSell";


export default function Market() {
    const { userItems } = useSelector(({ user }) => user);

    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const INITIAL_LIMIT = 20; //5 rows
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [itemsImxToShow, setItemsImxToShow] = useState(10);

    const allCollections = [DARKCOUNTRY_COLLECTION];

    const [filteredCollections, setFilteredCollections] = useState(allCollections);
    const [dcSchemas, setDcSchemas] = useState([])
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedCollectionsImx, setSelectedCollectionsImx] = useState('');

    const [allImxCollections, setAllImxCollections] = useState([]);
    const [filteredImxCollections, setFilteredImxCollections] = useState(allImxCollections);
    const [filteredDCschemas, setFilteredDCschemas] = useState(dcSchemas);
    const [allImxCollectionsAsset, setAllImxCollectionsAsset] = useState([]);

    const [selectedTemplate, setSelectedTemplate] = useQueryParam('template', StringParam);
    const [searchString, setSearchString] = useQueryParam('match', StringParam);
    const [sortOption, setSortOption] = useQueryParam('sort', StringParam);

    const [blockchainSelected, setBlockchainSelected] = useState('Flow')
    const [tokenSelected, setTokenSelected] = useState('SDM')

    const [waxSalesItem, setWaxSalesItem] = useState([])

    const containerRef = useRef();


    useEffect(() => fetchItems(), []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    });

    useEffect(() => {
        getSales()
            .then((data) => {
                setWaxSalesItem(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    useEffect(() => {
        getDCschemas()
            .then((data) => {
                setDcSchemas(data);
                setFilteredDCschemas(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    // useEffect(() => {
    //     if (localStorage.getItem('metamask')){
    //         setBlockchainSelected('Immutable')
    //     }
    //
    //     if (!localStorage.getItem('metamask')){
    //         setBlockchainSelected('Flow')
    //     }
    // }, [])

    const onScroll = ({ target: { scrollingElement: { clientHeight, scrollTop, scrollHeight } } }) => {
        if (clientHeight + scrollTop >= scrollHeight - 300)
            setLimit(Math.min(limit + INITIAL_LIMIT, itemsToShow.length));
    }

    useEffect(() => {
        if (blockchainSelected === 'Immutable') {
            getAllActiveAssets();
        }
    }, [blockchainSelected]);


    useEffect(() => {
        setLoading(true);

        const fetchAllImxCollection = async () => {
            try {
                const { data } = await axios.get(`${IMMUTABLE_SANDBOX_API}/collections`);
                const res = await axios.get(`${IMMUTABLE_SANDBOX_API}/collections/0xaf2945d065e19167524bec040bae292b5990fbb0`);
                if (data.result.length) {

                    setAllImxCollections([res.data, ...data.result]);
                    setFilteredImxCollections([res.data, ...data.result]);
                }
                if (selectedCollectionsImx.length) {
                    getAssetsFromCollection(selectedCollectionsImx);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        const getAssetsFromCollection = async (collection) => {
            try {
                const { data: { result } } = await axios.get(`${IMMUTABLE_SANDBOX_API}/orders?sell_token_address=${collection}&&buy_token_type=ETH`);
                setAllImxCollectionsAsset(result);
            } catch (e) {
                console.log(e);
            }
        };

        fetchAllImxCollection();
    }, [selectedCollectionsImx]);


    const getAllActiveAssets = async () => {
        await axios.get(`${IMMUTABLE_SANDBOX_API}/orders?status=active&&buy_token_type=ETH`)
            .then(({data: {result}}) => {
                setAllImxCollectionsAsset(result)
            })
            .catch((e) => {
                console.log(e)
            })
    }


    const fetchItems = (value = 'created_at') => {
        setLoading(true);

        axios.get(`${SALE_ORDERS_API}/orders?order_by=${value}`)
            .then(({ data }) => setAllItems(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    };

    const handleCollectionsSearch = ({ target: { value } }) => {

        if (value.length > 2 && blockchainSelected === 'Flow') {
            return setFilteredCollections(allCollections.filter(({ name }) => {
                return name.toString().toLowerCase().includes(value.toString().toLowerCase());
            }));
        }

        if (value.length > 2 && blockchainSelected === 'Immutable') {
            return setFilteredImxCollections(allImxCollections.filter(({ name }) => {
                return name.toString().toLowerCase().includes(value.toString().toLowerCase());
            }));
        }

        if (value.length > 2 && blockchainSelected === 'WAX') {
            return setFilteredDCschemas(dcSchemas.filter(({ schema_name }) => {
                return schema_name.toString().toLowerCase().includes(value.toString().toLowerCase());
            }));
        }

        setFilteredDCschemas(dcSchemas)
        setFilteredImxCollections(allImxCollections)
        setFilteredCollections(allCollections);
    };

    const handleItemsSearch = ({ target: { value } }) => {
        // if (value.length > 2 && filteredCollections.length !== 1)
        //     return toast.warning('Please select one collection to search an NFT by name');

        setSearchString(value);
    };

    const handleCollectionFilter = (collections) => {
        setSelectedCollections(collections);
    };

    const handleCollectionImxFilter = (collection) => {
        console.log(collection)
        setSelectedCollectionsImx(collection)
    }

    const handleTemplateFilter = (templateName) => {
        setSelectedTemplate(templateName === selectedTemplate ? '' : templateName);
    };

    const handleSetSortOption = (value) => {
        setSortOption(value);
    };

    const imxItemsToShow = (allImxCollectionsAsset, searchString) => {
        if (!searchString || searchString.length <= 2) {
            return allImxCollectionsAsset
                .sort((item1, item2) => {
                    switch (sortOption) {
                        case LISTINGS_DESC:
                            return item2.order_id - item1.order_id;

                        case LISTINGS_ASC:
                            return item1.order_id - item2.order_id;

                        case PRICE_ASC:
                            return Number(item1.buy.data.quantity) - Number(item2.buy.data.quantity);

                        case PRICE_DESC:
                            return Number(item2.buy.data.quantity) - Number(item1.buy.data.quantity) ;

                        default:
                            return item2.order_id - item1.order_id;
                    }
                });
        }
        return allImxCollectionsAsset
            .filter(item => {
                if (!item.sell.data.properties.name || typeof item.sell.data.properties.name !== 'string') {
                    return false;
                }

                return item.sell.data.properties.name.toLowerCase().includes(searchString.toLowerCase());
            }
        );
    };


    const itemsToShow = useMemo(() => {
        return allItems
            .filter((({ collection, data: { name, rarity, type } }) => {
                return (selectedCollections.length ? selectedCollections.includes(collection) : true) &&
                    (searchString && searchString.length > 2
                        ? name.toString().toLowerCase().includes(searchString.toString().toLowerCase())
                        : true
                    ) &&
                    (selectedTemplate
                        ? (selectedTemplate.includes('Card') || selectedTemplate.includes('Hero')
                            ? selectedTemplate.includes(rarity) && selectedTemplate.includes(type)
                            : selectedTemplate.includes(name)
                        )
                        : true
                    )
            }))
            .sort((item1, item2) => {
                switch (sortOption) {
                    case LISTINGS_ASC:
                        return item1.order_timestamp - item2.order_timestamp;

                    case LISTINGS_DESC:
                        return item2.order_timestamp - item1.order_timestamp;

                    case PRICE_ASC:
                        return item1.price - item2.price;

                    case PRICE_DESC:
                        return item2.price - item1.price;

                    default:
                        return item2.order_timestamp - item1.order_timestamp;
                }
            });
    }, [allItems, selectedCollections, selectedTemplate, sortOption, searchString]);

    const waxItemsToShow = useMemo(() => {
        const filteredItems = waxSalesItem.filter(({ asset_ids }) => {
            return (selectedCollections.length ? selectedCollections.includes(asset_ids[0].schema.schema_name) : true) &&
                (searchString && searchString.length > 2
                    ? asset_ids[0]?.name?.toString().toLowerCase().includes(searchString.toString().toLowerCase())
                    : true);
        });

        const sortedItems = filteredItems.sort((item1, item2) => {
            switch (sortOption) {
                case LISTINGS_ASC:
                    return item1.sale_id - item2.sale_id;
                case LISTINGS_DESC:
                    return item2.sale_id - item1.sale_id;
                case PRICE_ASC:
                    return +item1.listing_price.split(' ')[0] - +item2.listing_price.split(' ')[0];
                case PRICE_DESC:
                    return +item2.listing_price.split(' ')[0] - +item1.listing_price.split(' ')[0];
                default:
                    return item2.sale_id - item1.sale_id;
            }
        });

        return sortedItems;
    }, [waxSalesItem, searchString, sortOption, selectedCollections]);


    useEffect(() => forceVisible(), [itemsToShow, imxItemsToShow]);


    return (
        <div className={'market-container'}>
            <MarketFilters
                collections={filteredCollections}
                handleCollectionFilter={handleCollectionFilter}
                handleCollectionsSearch={handleCollectionsSearch}
                handleTemplateFilter={handleTemplateFilter}
                selectedTemplate={selectedTemplate}
                blockchainSelected={blockchainSelected}
                setBlockchainSelected={setBlockchainSelected}
                allImxCollections={filteredImxCollections}
                handleCollectionImxFilter={handleCollectionImxFilter}
                allImxCollectionsAsset={allImxCollectionsAsset}
                ref={containerRef}
                itemsImxToShow={itemsImxToShow}
                tokenSelected={tokenSelected}
                setTokenSelected={setTokenSelected}
                dcSchemas={filteredDCschemas}
            />

            <div className={'items-container'}>
                <CustomTextField
                    placeholder={'Search items'}
                    img={SearchIcon}
                    value={searchString}
                    onChange={handleItemsSearch}
                />

                <CustomSelect
                    options={[
                        LISTINGS_DESC,
                        LISTINGS_ASC,
                        PRICE_DESC,
                        PRICE_ASC
                    ]}
                    initialOption={sortOption}
                    handleChange={handleSetSortOption}
                    showUnboxButton={true}
                    items={itemsToShow}
                    itemImxToShow={allImxCollectionsAsset}
                    blockchainSelected={blockchainSelected}
                    waxItemsToShow={waxItemsToShow}
                />

                <div className={'items-wrapper'}>
                    {loading ? (
                        <ItemsLoadingPlaceholder />
                    ) : (
                        <>
                            {blockchainSelected === 'Flow' &&
                                itemsToShow
                                    .slice(0, limit)
                                    .map(i => (
                                        <Item item={i} userOwner={userItems.includes(i.item_id)} key={i.id} />
                                    ))}

                            {/*{blockchainSelected === 'Immutable' &&*/}
                            {/*    imxItemsToShow(allImxCollectionsAsset, searchString)*/}
                            {/*        .slice(0, limit)*/}
                            {/*        .map((i) => {*/}
                            {/*        return <IMXOnSale item={i} userOwner={false} />;*/}
                            {/*    })*/}
                            {/*}*/}

                            {blockchainSelected === 'WAX' &&
                                waxItemsToShow
                                    .slice(0, limit)
                                    .map((i) => {
                                        return <WaxItemToSell item={i} userOwner={false} />;
                                    })
                            }

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
