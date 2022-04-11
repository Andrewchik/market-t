import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { forceVisible } from "react-lazyload";
import { useQueryParam, StringParam } from 'use-query-params';

import axios from "axios";

import "./Market.scss";

import MarketFilters from "../../components/MarketFilters/MarketFilters";
import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import CustomSelect from "../../generics/CustomSelect/CustomSelect";
import Item from "../../components/Item/Item";
import ItemsLoadingPlaceholder from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";

import SearchIcon from "../../resources/images/icons/search_icon.webp";

import {
    SALE_ORDERS_API,
    LISTINGS_ASC,
    LISTINGS_DESC,
    PRICE_ASC,
    PRICE_DESC,
    DARKCOUNTRY_COLLECTION
} from "../../constants";

export default function Market() {
    const { userItems } = useSelector(({ user }) => user);

    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const INITIAL_LIMIT = 20; //5 rows
    const [limit, setLimit] = useState(INITIAL_LIMIT);

    const allCollections = [DARKCOUNTRY_COLLECTION];
    const [filteredCollections, setFilteredCollections] = useState(allCollections);
    const [selectedCollections, setSelectedCollections] = useState([]);

    const [selectedTemplate, setSelectedTemplate] = useQueryParam('template', StringParam);
    const [searchString, setSearchString] = useQueryParam('match', StringParam);
    const [sortOption, setSortOption] = useQueryParam('sort', StringParam);

    useEffect(() => fetchItems(), []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    });

    const onScroll = ({ target: { scrollingElement: { clientHeight, scrollTop, scrollHeight } } }) => {
        if (clientHeight + scrollTop >= scrollHeight - 300)
            setLimit(Math.min(limit + INITIAL_LIMIT, itemsToShow.length));
    }

    const fetchItems = () => {
        setLoading(true);

        axios.get(`${SALE_ORDERS_API}/orders`)
            .then(({ data }) => setAllItems(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    };

    const handleCollectionsSearch = ({ target: { value } }) => {
        if (value.length > 2) {
            return setFilteredCollections(allCollections.filter(({ name }) => {
                return name.toString().toLowerCase().includes(value.toString().toLowerCase());
            }));
        }

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

    const handleTemplateFilter = (templateName) => {
        setSelectedTemplate(templateName === selectedTemplate ? '' : templateName);
    };

    const handleSetSortOption = (value) => {
        setSortOption(value);
    };

    const itemsToShow = useMemo(() => {
        return allItems
            .filter((({ collection, data: { name, rarity } }) => {
                return (selectedCollections.length ? selectedCollections.includes(collection) : true) &&
                    (searchString && searchString.length > 2
                        ? name.toString().toLowerCase().includes(searchString.toString().toLowerCase())
                        : true
                    ) &&
                    (selectedTemplate
                        ? (selectedTemplate.includes('Card')
                            ? rarity === selectedTemplate.replace('Card', '').trim()
                            : name === selectedTemplate
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
                        return item1.order_timestamp - item2.order_timestamp;
                }
            });
    }, [allItems, selectedCollections, selectedTemplate, sortOption, searchString]);

    useEffect(() => forceVisible(), [itemsToShow]);

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
                />

                <div className={'items-wrapper'}>
                    { loading
                        ? <ItemsLoadingPlaceholder />
                        : <>
                            { itemsToShow
                                .slice(0, limit)
                                .map(i => <Item
                                    item={i}
                                    userOwner={userItems.includes(i.item_id)}
                                    key={i.id}
                                /> )
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
