import { useState } from "react";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SearchIcon from "../../../resources/images/search_icon.png";
import DotsMenu from "../../../resources/images/dots_menu_filter.png";

import './CollectionFilter.scss'

import CustomTextField from "../../../generics/CustomTextField/CustomTextField";

function CollectionFilter({ collections, handleFilter, handleCollectionsSearch }) {
    const [expanded, setExpanded] = useState(true);
    const [selectedCollections, setSelectedCollections] = useState([]);

    const handleSelectCollection = (selectedCollection) => {
        const newSelectedCollections = selectedCollections.includes(selectedCollection)
            ? selectedCollections.filter(collection => collection !== selectedCollection)
            : [...selectedCollections, selectedCollection];

        setSelectedCollections(newSelectedCollections);
        handleFilter(newSelectedCollections);
    };

    return (
        <div className={'collection-filter-wrapper'}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={ <ExpandMoreIcon /> }
                >
                    <img src={ DotsMenu } alt="" />
                    <Typography>Collections</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomTextField
                        placeholder={'Search collections'}
                        img={SearchIcon}
                        onChange={handleCollectionsSearch}
                    />
                    <div className={'filter-collections'}>
                        {collections.map(({ image, name }) =>
                            <div className={'filter-collection'} onClick={() => handleSelectCollection(name)} key={name}>
                                <img src={ image } alt="" />
                                <p>{ name }</p>
                                { selectedCollections.includes(name) &&
                                    <span onClick={() => handleSelectCollection(name)}>x</span>
                                }
                            </div>
                        ) }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default CollectionFilter
