import React, { Link, useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { GiBoxUnpacking } from 'react-icons/gi';

import { IconButton, Tooltip, Fade } from '@material-ui/core';

import './Item.scss'

import CustomButton from "../../generics/CustomButton/CustomButton";

import { renderDarkCountryItemImageOrVideo } from '../../helpers';

import ArrowUpLeft from "../../resources/svg/arrow-up-left";

export default function Item({
    item: { item_id, price, collection, data: { name, ipfs, mediaUrl } },
    showSellModal = null,
    showTransferModal = null,
    processing = false,
    userOwner = false,
    hideButtons = false,
    handleUnpackClick,
    isLandPack = false
}) {
    const history = useHistory();

    return (
        <LazyLoad height={'400px'} once>
            <div className={'item-wrapper'}>
                <div className={'image-wrapper'}>
                    { price
                        ? <Link to={`/market/${item_id}`}>
                            { renderDarkCountryItemImageOrVideo(
                                ipfs, mediaUrl, name, false,
                                { width: '100%', height: 'auto' }
                            ) }
                        </Link>
                        : <>
                            { renderDarkCountryItemImageOrVideo(
                                ipfs, mediaUrl, name, false,
                                { width: '100%', height: 'auto' }
                            ) }
                        </>
                    }
                </div>

                <div className={ `item-description ${hideButtons ? 'block-center' : ''}` }>
                    <p className={'collection'}>{ collection }</p>
                    <p>{name}</p>

                    { !hideButtons && price && !!!showSellModal &&
                        <div className={'item-action'}>
                            <CustomButton
                                text={ userOwner ? 'Cancel' : 'Buy' }
                                onClick={ () => history.push(`/market/${item_id}`) }
                                disabled={processing}
                            />

                            <div className={'item-price'}>
                                <p>Price:</p>
                                <p>{price} FLOW</p>
                            </div>
                        </div>
                    }

                    { !hideButtons && !price && !!showSellModal &&
                        <div className={'sell-action'}>
                            { isLandPack &&
                                <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={ <p>Unpack</p> }
                                >
                                    <IconButton
                                        aria-label="unpack"
                                        className="unpack-icon"
                                        onClick={handleUnpackClick}
                                    >
                                        <GiBoxUnpacking
                                            size={20}
                                            color={'#D69700'}
                                        />
                                    </IconButton>
                                </Tooltip>
                            }

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
