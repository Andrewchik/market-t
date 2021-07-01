import React, { Link, useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
//import ReactPlayer from 'react-player/lazy';

import './Item.scss'

import CustomButton from "../../generics/CustomButton/CustomButton";

import { getDarkCountryImage } from '../../helpers';

function Item({
    item: { item_id, price, collection, data: { name, ipfs } },
    showSellModal = null,
    processing = false,
    userOwner = false,
    hideButtons = false
}) {
    const history = useHistory();

    return (
        <LazyLoad height={'400px'} once>
            <div className={'item-wrapper'}>
                {/*<ReactPlayer*/}
                {/*    url={ ipfs ?  `https://ipfs.io/ipfs/${ipfs}` : '' }*/}
                {/*    width={'90%'}*/}
                {/*    height={'80%'}*/}
                {/*    onClick={ () => price ? history.push(`/market/${item_id}`) : {} }*/}
                {/*/>*/}
                <div className={'image-wrapper'}>
                    <Link to={price ? `/market/${item_id}` : ''}>
                        <img src={getDarkCountryImage(ipfs)} alt="" />
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

export default Item
