import './ItemsLoadingPlaceholder.js.scss';

import ItemLoadingPlaceholder from "./ItemLoadingPlaceholder/ItemLoadingPlaceholder";

export default function ItemsLoadingPlaceholder({ amount }) {
    return (
        <div className={'placeholder-loading-items-wrapper'}>
            { Array.from(Array(amount ? amount : 8).keys())
                .map((_, index) => <ItemLoadingPlaceholder key={index} /> )
            }
        </div>
    );
}
