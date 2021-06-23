import './MarketFilters.scss';

import CollectionFilter from "./CollectionFilter/CollectionFilter";

function MarketFilters({ collections, handleCollectionFilter, handleCollectionsSearch }) {
    return (
        <div className={'market-filters-wrapper'}>
            <CollectionFilter
                collections={collections}
                handleFilter={handleCollectionFilter}
                handleCollectionsSearch={handleCollectionsSearch}
            />
        </div>
    );
}

export default MarketFilters;
