import React, { Link, useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";

import './Item.scss'

import CustomButton from "../../generics/CustomButton/CustomButton";

import { renderDarkCountryItemImageOrVideo } from '../../helpers';

export default function Item({
    item: { item_id, price, collection, data: { name, ipfs, mediaUrl } },
    showSellModal = null,
    processing = false,
    userOwner = false,
    hideButtons = false
}) {
    const history = useHistory();

    return (
        <LazyLoad height={'400px'} once>
            <div className={'item-wrapper'}>
                <div className={'image-wrapper'}>
                    <Link to={price ? `/market/${item_id}` : ''}>
                        { renderDarkCountryItemImageOrVideo(
                            ipfs, mediaUrl, name, false,
                            { width: '100%', height: 'auto' }
                        ) }
                    </Link>
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
                        <CustomButton
                            text={'SELL'}
                            onClick={ showSellModal }
                        />
                    }
                </div>
            </div>
        </LazyLoad>
    )
}
