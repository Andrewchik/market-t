import { Link, useHistory } from "react-router-dom";

import './HomeIMXItem.scss';
import '../Item/Item.scss';

import CustomButton from "../../generics/CustomButton/CustomButton";


export default function HomeIMXItem({ purchaseId, item_id, symbol, mediaUrl, name, price, collection, status }) {
    const history = useHistory();

    return (
        <Link to={ status === 'filled' ? `/purchase-imx/${ purchaseId }` : `/imx-market/${ purchaseId }` }>
            <div className={ 'home-item-wrapper item-wrapper' }>
                <div className={ 'image-wrapper' }>
                    <img src={mediaUrl} alt=""/>
                </div>

                <div className={ 'item-description' }>
                    <p className={ 'collection' }>{ collection }</p>
                    <p>{ name }</p>

                    <div className={ 'item-action' }>
                        <CustomButton
                            text={ 'Details' }
                            onClick={ () => status === ''
                                ? history.push(`/purchase-imx/${ purchaseId }`)
                                : history.push(`/imx-market/${ purchaseId }`)
                            }
                        />

                        <div className={ 'item-price' }>
                            <p>Price:</p>
                            <p>{ price } ETH</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
