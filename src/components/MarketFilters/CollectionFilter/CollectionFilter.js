import React, {useState} from "react";
import randomcolor from 'randomcolor';

import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DCLogo from "../../../resources/images/logos/dc-logo2.webp";

import './CollectionFilter.scss'


function CollectionFilter({ collections, handleFilter, handleCollectionsSearch, handleTemplateFilter, selectedTemplate, blockchainSelected, allImxCollections, handleCollectionImxFilter, dcSchemas}) {
    const [expanded, setExpanded] = useState(window.innerWidth >= 1024);
    const [expandedSchemas, setExpandedSchemas] = useState(window.innerWidth >= 1024);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedSchemas, setSelectedSchemas] = useState([]);

    const handleSelectCollection = (selectedCollection) => {
        const newSelectedCollections = selectedCollections.includes(selectedCollection)
            ? selectedCollections.filter(collection => collection !== selectedCollection)
            : [...selectedCollections, selectedCollection];

        setSelectedCollections(newSelectedCollections);
        handleFilter(newSelectedCollections);
    };

    const handleSelectSchemas = (e, selectedSchema) => {
        const newSelectedSchemas = selectedSchemas.includes(selectedSchema)
            ? selectedSchemas.filter(collection => collection !== selectedSchema)
            : [...selectedSchemas, selectedSchema];

        setSelectedSchemas(newSelectedSchemas);
        handleFilter(newSelectedSchemas);
    };


    const handleSelectCollectionIMX = (event, selectedCollection) => {
        event.stopPropagation();

        const newSelectedCollections = selectedCollections.includes(selectedCollection)
            ? []
            : [selectedCollection];
        setSelectedCollections(newSelectedCollections);
        handleCollectionImxFilter(newSelectedCollections);
    };

    // const handleSelectDCschemas = (event, selectedSchemas) => {
    //     event.stopPropagation();
    //
    //     const newSelectedScemas = selectedCollections.includes(selectedSchemas)
    //         ? []
    //         : [selectedSchemas];
    //     setSelectedSchemas(newSelectedScemas);
    //     // handleCollectionImxFilter(newSelectedCollections);
    // };

    return (
        <div className={'collection-filter-wrapper'}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                {/*<AccordionSummary*/}
                {/*    expandIcon={ <ExpandMoreIcon /> }*/}
                {/*>*/}
                {/*    <img src={ DotsMenu } alt="" />*/}
                {/*    <Typography>Collections</Typography>*/}
                {/*</AccordionSummary>*/}
                <AccordionDetails>
                    {/*<CustomTextField*/}
                    {/*    placeholder={'Search collections'}*/}
                    {/*    img={SearchIcon}*/}
                    {/*    onChange={handleCollectionsSearch}*/}
                    {/*/>*/}

                    {blockchainSelected === 'Flow' &&
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

                                                { templateName.toString().includes('Hero') &&
                                                    <p className={'template-image template-image-hero-color'} />
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
                    }

                    {blockchainSelected === 'Immutable' &&
                        <div  className={'filter-collections imx-collections'}>
                                        {allImxCollections.map(({ address, collection_image_url, name }, index) => (
                                            <div className={'filter-collection-wrapper'} key={index}>
                                                <div className={`filter-collection`} onClick={(event) => handleSelectCollectionIMX(event, address)} key={name}>
                                                    {collection_image_url ? (
                                                        <img src={collection_image_url} alt="" />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                                marginRight: "10px",
                                                                borderRadius: "50%",
                                                                backgroundColor: randomcolor(),
                                                            }}
                                                        />
                                                    )}
                                                    <p className={selectedCollections.includes(address) ? "available" : ""}>{name}</p>
                                                    {selectedCollections.includes(address) && (
                                                        <span onClick={(event) => handleSelectCollectionIMX(event, "")}>x</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                    }

                    {blockchainSelected === 'WAX' &&
                        <div  className={'filter-collections wax'}>
                                <div className={'filter-collection-wrapper'}>
                                    <div className={`filter-collection`}>
                                        <Accordion expanded={expandedSchemas} onChange={() => setExpandedSchemas(!expandedSchemas)} className={'accordoin-for-schemas'}>
                                            <AccordionSummary
                                                expandIcon={ <ExpandMoreIcon /> }
                                                className={'filter-collection-schemas'}
                                            >
                                                <img src={ DCLogo } alt="DCLogo" />
                                                <p className={"available"}>Dark Country</p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="schema-list">
                                                    {dcSchemas && dcSchemas.map((item) =>
                                                        <div className="schema-item" onClick={(event) => handleSelectSchemas(event, item.schema_name)}>
                                                            <div
                                                                style={{
                                                                    width: "20px",
                                                                    height: "20px",
                                                                    marginRight: "20px",
                                                                    borderRadius: "50%",
                                                                    backgroundColor: '#770F00',
                                                                }}
                                                            />
                                                            <p className={selectedSchemas.includes(item.schema_name) ? "available" : ""}>{item.schema_name}</p>
                                                            {selectedSchemas.includes(item.schema_name) && (
                                                                <span onClick={(event) => handleSelectSchemas(event, "")}>x</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>

                                    </div>
                                </div>
                        </div>
                    }

                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default CollectionFilter
