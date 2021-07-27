import { useState } from "react";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SearchIcon from "../../../resources/images/icons/search_icon.png";
import DotsMenu from "../../../resources/images/dots_menu_filter.png";

import './CollectionFilter.scss'

import CustomTextField from "../../../generics/CustomTextField/CustomTextField";

function CollectionFilter({ collections, handleFilter, handleCollectionsSearch, handleTemplateFilter, selectedTemplate }) {
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
                        {collections.map(({ image, name, templates }) =>
                            <div className={'filter-collection-wrapper'} key={name}>
                                <div className={'filter-collection'} onClick={() => handleSelectCollection(name)} key={name}>
                                    <img src={ image } alt="" />
                                    <p>{ name }</p>
                                    { selectedCollections.includes(name) &&
                                        <span onClick={() => handleSelectCollection(name)}>x</span>
                                    }
                                </div>
                                <div className={'filter-collection-templates'}>
                                    { templates.map(templateName =>
                                        <div
                                            className={'filter-collection-template'}
                                            onClick={() => handleTemplateFilter(templateName)}
                                            key={templateName}
                                        >
                                            { templateName.toString().includes('Land') &&
                                                <p className={'template-image template-image-land-color'} />
                                            }

                                            { templateName.toString().includes('Card') &&
                                                <p className={'template-image template-image-card-color'} />
                                            }

                                            { templateName.toString().includes('Pack') &&
                                                <p className={'template-image template-image-pack-color'} />
                                            }

                                            <p>{ templateName }</p>
                                            { selectedTemplate === templateName &&
                                                <span onClick={() => handleTemplateFilter(templateName)}>x</span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default CollectionFilter
