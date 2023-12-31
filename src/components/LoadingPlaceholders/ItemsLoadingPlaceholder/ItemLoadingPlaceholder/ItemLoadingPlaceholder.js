import './ItemLoadingPlaceholder.scss';

export default function ItemLoadingPlaceholder() {
    return (
        <div className={'placeholder-loading-item-wrapper'}>
            <div className="ph-item">
                <div className="ph-col-12">
                    <div className="ph-picture" />
                </div>
            </div>
        </div>
    );
}
