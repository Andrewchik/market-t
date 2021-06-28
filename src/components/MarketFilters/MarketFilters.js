import './MarketFilters.scss';

import CollectionFilter from "./CollectionFilter/CollectionFilter";

function MarketFilters({ collections, handleCollectionFilter, handleCollectionsSearch, handleTemplateFilter, selectedTemplate }) {
    return (
        <div className={'market-filters-wrapper'}>
            <CollectionFilter
                collections={collections}
                handleFilter={handleCollectionFilter}
                handleCollectionsSearch={handleCollectionsSearch}
                handleTemplateFilter={handleTemplateFilter}
                selectedTemplate={selectedTemplate}
            />
        </div>
    );
}

export default MarketFilters;
