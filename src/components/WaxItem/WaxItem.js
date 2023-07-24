import React from "react-router-dom";
import LazyLoad from "react-lazyload";

import './WaxItem.scss'
import {Fade, IconButton, Tooltip} from "@material-ui/core";
import CustomButton from "../../generics/CustomButton/CustomButton";
import ArrowUpLeft from "../../resources/svg/arrow-up-left";

export default function WaxItem({
                                    item: { data: {name, img}, collection: { collection_name }, asset_id },
                                    showSellModal = null,
                                    showTransferModal = null,
                                    showBuyRamModal = null,
                                    processing = false,
                                    userOwner = false,
                                    hideButtons = false,
                                    itemOnSale=false,
                                    handlerCanselWaxItemFromListing,
                                    sale_id
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
        <LazyLoad key={Number(asset_id)} height={'400px'} once>
            <div className={'imx-item-wrapper'}>
                <div className={'imx-image-wrapper'}>
                    {img.startsWith('Qm') ? (
                        <img src={`https://atomichub-ipfs.com/ipfs/${img}`} alt=""/>
                    ) : (
                        <img src={img} alt=""/>
                    )}
                </div>
                <div className={ `item-description ${hideButtons ? 'block-center' : ''}` }>
                    <p className={'collection'}>{ shortenString(collection_name) }</p>
                    <p>{shortenString(name)}</p>

                    {!hideButtons && itemOnSale &&
                        <div className={'sell-action'}>

                            <CustomButton
                                text={'CANCEL'}
                                onClick={() => handlerCanselWaxItemFromListing(sale_id) }
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
