import React from "react-router-dom";
import LazyLoad from "react-lazyload";

import './IMXItem.scss'
import {Fade, IconButton, Tooltip} from "@material-ui/core";
import CustomButton from "../../generics/CustomButton/CustomButton";
import ArrowUpLeft from "../../resources/svg/arrow-up-left";

export default function IXMItem({
                                    item: { name, image_url, collection, token_id },
                                    showSellModal = null,
                                    showTransferModal = null,
                                    processing = false,
                                    userOwner = false,
                                    hideButtons = false,
                                    itemOnSale=false,
                                    handlerCanselItemFromListing,
                                    orderId
                                }) {


    const shortenString = (str) => {
        if (!str) {
            return '';
        }
        const words = str.split(' ');
        if (words.length <= 2) {
            return str;
        } else {
            return words.slice(0, 2).join(' ');
        }
    }

    return (
        <LazyLoad key={Number(token_id)} height={'400px'} once>
            <div className={'imx-item-wrapper'}>
                <div className={'imx-image-wrapper'}>
                    <img src={image_url} alt=""/>
                </div>
                <div className={ `item-description ${hideButtons ? 'block-center' : ''}` }>
                    <p className={'collection'}>{ shortenString(collection.name) }</p>
                    <p>{shortenString(name)}</p>

                    {!hideButtons && itemOnSale &&
                        <div className={'sell-action'}>

                            <CustomButton
                                text={'CANCEL'}
                                onClick={() => handlerCanselItemFromListing(String(orderId)) }
                            />

                        </div>
                    }

                    { !hideButtons && !!showSellModal &&
                        <div className={'sell-action'}>

                            <CustomButton
                                text={'SELL'}
                                onClick={ showSellModal }
                            />

                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                                title={ <p>Transfer</p> }
                            >
                                <IconButton
                                    aria-label="transfer"
                                    className="transfer-icon"
                                    onClick={showTransferModal}
                                >
                                    <ArrowUpLeft />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                </div>
            </div>
        </LazyLoad>
    )
}
