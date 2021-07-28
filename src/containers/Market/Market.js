import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forceVisible } from "react-lazyload";

import axios from "axios";

import './Market.scss';

import MarketFilters from "../../components/MarketFilters/MarketFilters";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomSelect from "../../generics/CustomSelect/CustomSelect";

import Item from "../../components/Item/Item";
import ItemsLoadingPlaceholder from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";

import SearchIcon from "../../resources/images/icons/search_icon.png";

import {
    SALE_ORDERS_API,
    LISTINGS_ASC,
    LISTINGS_DESC,
    PRICE_ASC,
    PRICE_DESC,
    DARKCOUNTRY_COLLECTION
} from "../../constants";

export default function Market() {
    //5 rows
    const INITIAL_LIMIT = 20;
    const allCollections = [DARKCOUNTRY_COLLECTION];

    const [allItems, setAllItems] = useState([]);
    const [itemsToShow, setItemsToShow] = useState([]);
    const [searchItems, setSearchItems] = useState(null);
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [reRender, setReRender] = useState(false);
    const [sortOption, setSortOption] = useState(LISTINGS_ASC);
    const [filteredCollections, setFilteredCollections] = useState(allCollections);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [loading, setLoading] = useState(true);

    const { userItems } = useSelector(({ user }) => user);

    useEffect(() => fetchItems(), []);

    useEffect(() => {
        const handleSort = () => {
            switch (sortOption) {
                case LISTINGS_ASC:
                    if (searchItems)
                        setSearchItems(searchItems.sort((item1, item2) => {
                            return item1.order_timestamp - item2.order_timestamp;
                        }));
                    else
                        setItemsToShow(itemsToShow.sort((item1, item2) => {
                            return item1.order_timestamp - item2.order_timestamp;
                        }));
                    break;

                case LISTINGS_DESC:
                    if (searchItems)
                        setSearchItems(searchItems.sort((item1, item2) => {
                            return item2.order_timestamp - item1.order_timestamp;
                        }));
                    else
                        setItemsToShow(itemsToShow.sort((item1, item2) => {
                            return item2.order_timestamp - item1.order_timestamp;
                        }));
                    break;

                case PRICE_ASC:
                    if (searchItems)
                        setSearchItems(searchItems.sort((item1, item2) => {
                            return item1.price - item2.price;
                        }));
                    else
                        setItemsToShow(itemsToShow.sort((item1, item2) => {
                            return item1.price - item2.price;
                        }));
                    break;

                case PRICE_DESC:
                    if (searchItems)
                        setSearchItems(searchItems.sort((item1, item2) => {
                            return item2.price - item1.price;
                        }));
                    else
                        setItemsToShow(itemsToShow.sort((item1, item2) => {
                            return item2.price - item1.price;
                        }));
                    break;

                default:
                    return;
            }

            setReRender(!reRender);
        };

        handleSort();
    }, [sortOption, itemsToShow])

    useEffect(() => forceVisible(), [reRender]);

    useEffect(() => {
        if (!selectedTemplate) {
            setItemsToShow(allItems);
        } else if (selectedTemplate && selectedTemplate.includes('Card')) {
            //TODO: add type card to data in db and then check type card instead of rarity
            const cardRarity = selectedTemplate.replace('Card', '').trim();

            setItemsToShow(allItems.filter(({ data: { rarity } }) => rarity === cardRarity));
        } else {
            setItemsToShow(allItems.filter(({ data: { name } }) => name === selectedTemplate));
        }

        setReRender(!reRender);
    }, [selectedTemplate]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    });

    const onScroll = ({ target: { scrollingElement: { clientHeight, scrollTop, scrollHeight } } }) => {
        if (clientHeight + scrollTop >= scrollHeight - 200)
            setLimit(Math.min(limit + INITIAL_LIMIT, itemsToShow.length));
    }

    const fetchItems = () => {
        setLoading(true);

        axios.get(`${SALE_ORDERS_API}/orders`)
            .then(({ data }) => {
                setAllItems(data);
                setItemsToShow(data);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    };

    const handleCollectionFilter = (selectedCollections) => {
        if (selectedCollections.length)
            setItemsToShow(allItems.filter(({ collection }) => selectedCollections.includes(collection)))
        else
            setItemsToShow(allItems);
    };

    const handleCollectionsSearch = ({ target: { value } }) => {
        if (value.length > 2) {
            return setFilteredCollections(allCollections.filter(({ name }) => {
                return name.toString().toLowerCase().startsWith(value.toString().toLowerCase());
            }));
        }

        setFilteredCollections(allCollections);
    };

    const handleItemsSearch = ({ target: { value } }) => {
        if (value.length > 2 && filteredCollections.length !== 1)
            return toast.warning('Please select one collection to search an NFT by name');

        if (value.length > 2)
            return setSearchItems(itemsToShow.filter(({ data: { name } }) => {
                return name.toString().toLowerCase().startsWith(value.toString().toLowerCase());
            }));

        if (!!searchItems)
            setSearchItems(null);
    };

    const handleTemplateFilter = (templateName) => {
        setSelectedTemplate(templateName === selectedTemplate ? '' : templateName);
    };

    return (
        <div className={'market-container'}>
            <MarketFilters
                collections={filteredCollections}
                handleCollectionFilter={handleCollectionFilter}
                handleCollectionsSearch={handleCollectionsSearch}
                handleTemplateFilter={handleTemplateFilter}
                selectedTemplate={selectedTemplate}
            />
            <div className={'items-container'}>
                <CustomTextField
                    placeholder={'Search items'}
                    img={SearchIcon}
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
                    handleChange={setSortOption}
                />

                <div className={'items-wrapper'}>
                    { loading
                        ? <ItemsLoadingPlaceholder />
                        : <>
                            { !searchItems &&
                                itemsToShow
                                    .slice(0, limit)
                                    .map(i => <Item
                                        item={i}
                                        userOwner={userItems.includes(i.item_id)}
                                        //key={i.item_id}
                                    /> )
                            }

                            { searchItems &&
                                searchItems
                                    .slice(0, limit)
                                    .map(i => <Item
                                        item={i}
                                        userOwner={userItems.includes(i.item_id)}
                                        //key={i.item_id}
                                    /> )
                            }
                        </>

                    }
                </div>
            </div>
        </div>
    )
}
