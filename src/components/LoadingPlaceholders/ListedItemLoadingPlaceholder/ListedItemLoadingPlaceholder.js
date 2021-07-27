import './ListedItemLoadingPlaceholder.scss';

export default function ListedItemLoadingPlaceholder() {
    return (
      <div className={'listed-item-loading-placeholder-wrapper'}>
          <div className="ph-item">
              <div className={'ph-col-6'}>
                  <div className={'ph-picture'} />
              </div>
              <div className={'ph-row-wrapper'}>
                  <div className={'ph-row'}>
                      <div className={'ph-col-8 big'} />
                      <div className={'ph-col-4 empty'} />
                      <div className={'ph-col-4'} />
                      <div className={'ph-col-8 empty'} />
                      <div className={'ph-col-12 empty'} />
                      <div className={'ph-col-12 empty'} />
                      <div className={'ph-col-6 big'} />
                      <div className={'ph-col-6 empty'} />
                      <div className={'ph-col-12 empty'} />
                      <div className={'ph-col-8 big'} />
                      <div className={'ph-col-4 big empty'} />
                      <div className={'ph-col-8 big'} />
                      <div className={'ph-col-4 big empty'} />
                      <div className={'ph-col-12 empty'} />
                      <div className={'ph-col-6 big'} />
                      <div className={'ph-col-12 empty'} />
                      <div className={'ph-col-12 empty'} />
                      <div className={'ph-col-4 big big-h-30'} />
                      <div className={'ph-col-2 big big-h-30 empty'} />
                      <div className={'ph-col-4 big big-h-30'} />
                  </div>
              </div>
          </div>
      </div>
    );
}
