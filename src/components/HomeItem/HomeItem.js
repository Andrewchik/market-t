import React, { useHistory } from "react-router-dom";

import './HomeItem.scss';
import '../Item/Item.scss';

import { getDarkCountryImage } from "../../helpers";
import CustomButton from "../../generics/CustomButton/CustomButton";

function HomeItem({ purchaseId, item_id, image, name, price, collection }) {
    const history = useHistory();

    return (
        <div
            className={'home-item-wrapper item-wrapper'}
            onClick={ () => purchaseId
                ? history.push(`/purchase/${purchaseId}`)
                : history.push(`/market/${item_id}`)
            }
        >
            <div className={'image-wrapper'}>
                <img src={getDarkCountryImage(image)} alt="" />
            </div>
            <div className={'item-description'}>
                <p className={'collection'}>{ collection }</p>
                <p>{ name }</p>
                <div className={'item-action'}>
                    <CustomButton
                        text={ 'Details' }
                        onClick={ () => purchaseId
                            ? history.push(`/purchase/${purchaseId}`)
                            : history.push(`/market/${item_id}`)
                        }
                    />
                    <div className={'item-price'}>
                        <p>Price:</p>
                        <p>{price} FLOW</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeItem;
