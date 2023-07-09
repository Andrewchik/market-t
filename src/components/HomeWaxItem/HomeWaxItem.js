import { Link, useHistory } from "react-router-dom";

import './HomeWaxItem.scss';
import '../Item/Item.scss';

import CustomButton from "../../generics/CustomButton/CustomButton";

import { renderDarkCountryItemImageOrVideo } from "../../helpers";

export default function HomeWaxItem({ ipfs, mediaUrl, name, price, item_id, collection }) {
    const history = useHistory();

    return (
        <Link to={ `/wax-market/${ item_id }` }>
            <div key={item_id} className={ 'home-item-wrapper item-wrapper' }>
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
                            onClick={ () => history.push(`/wax-market/${ item_id }`)
                            }
                        />

                        <div className={ 'item-price' }>
                            <p>Price:</p>
                            <p>{ price }</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
