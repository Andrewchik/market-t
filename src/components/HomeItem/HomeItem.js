import { Link, useHistory } from "react-router-dom";

import './HomeItem.scss';
import '../Item/Item.scss';

import CustomButton from "../../generics/CustomButton/CustomButton";

import { renderDarkCountryItemImageOrVideo } from "../../helpers";

function HomeItem({ purchaseId, item_id, ipfs, mediaUrl, name, price, collection }) {
    const history = useHistory();

    return (
        <Link to={ purchaseId ? `/purchase/${ purchaseId }` : `/market/${ item_id }` }>
            <div className={ 'home-item-wrapper item-wrapper' }>
                <div className={ 'image-wrapper' }>
                    { renderDarkCountryItemImageOrVideo(
                        ipfs, mediaUrl, name, false,
                        { width: '100%', height: 'auto' }
                    ) }
                </div>
                <div className={ 'item-description' }>
                    <p className={ 'collection' }>{ collection }</p>
                    <p>{ name }</p>
                    <div className={ 'item-action' }>
                        <CustomButton
                            text={ 'Details' }
                            onClick={ () => purchaseId
                                ? history.push(`/purchase/${ purchaseId }`)
                                : history.push(`/market/${ item_id }`)
                            }
                        />
                        <div className={ 'item-price' }>
                            <p>Price:</p>
                            <p>{ price } FLOW</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HomeItem;
