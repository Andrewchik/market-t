import './MarketFilters.scss';

import CollectionFilter from "./CollectionFilter/CollectionFilter";
import BlockchainFilter from "./BlockchainFilter/BlockchainFilter";

export default function MarketFilters(
    { collections, handleTemplateFilter, selectedTemplate, blockchainSelected, setBlockchainSelected, allImxCollections, handleCollectionFilter, allImxCollectionsAsset, tokenSelected, setTokenSelected, dcSchemas, handlerCloseModal }
) {
    return (
        <div className={'market-filters-wrapper'}>
            <BlockchainFilter
                blockchainSelected={blockchainSelected}
                setBlockchainSelected={setBlockchainSelected}
                tokenSelected={tokenSelected}
                setTokenSelected={setTokenSelected}
                handlerCloseModal={handlerCloseModal}
            />
            <CollectionFilter
                collections={collections}
                handleFilter={handleCollectionFilter}
                handleTemplateFilter={handleTemplateFilter}
                selectedTemplate={selectedTemplate}
                blockchainSelected={blockchainSelected}
                allImxCollections={allImxCollections}
                handleCollection={handleCollectionFilter}
                allImxCollectionsAsset={allImxCollectionsAsset}
                dcSchemas={dcSchemas}
            />
        </div>
    );
}
