import { useEffect, useState } from "react";

import axios from "axios";

import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';

import UpcomingDrop1Image from "../../resources/images/Drop Cards.png";
import CommonLandImage from "../../resources/images/Common__xvid.b6df2fac.jpg";
import EpicLandImage from "../../resources/images/Epic__xvid.d15929ea.jpg";
import LegendaryLandImage from "../../resources/images/Legendary__xvid.d534466a.jpg";
import MythicalLandImage from "../../resources/images/Mithycal__xvid.b7d97282.jpg";
import RareLandImage from "../../resources/images/Rare__xvid.b478551e.jpg";

import CommonLandVideo from "../../resources/videos/Common__xvid.mp4";
import EpicLandVideo from "../../resources/videos/Epic__xvid.mp4";
import LegendaryLandVideo from "../../resources/videos/Legendary__xvid.mp4";
import MythicalLandVideo from "../../resources/videos/Mithycal__xvid.mp4"
import RareLandVideo from "../../resources/videos/Rare__xvid.mp4";

import './HomeContainer.scss';
import '../../components/HomeItem/HomeItem.scss';

import HomeItem from "../../components/HomeItem/HomeItem";
import ItemsLoadingPlaceholder from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";

import { SALE_ORDERS_API, MARKET_PURCHASE_API } from "../../constants";

function HomeContainer() {
    const [lastPurchases, setLastPurchases] = useState([]);
    const [lastPurchasesLoading, setLastPurchasesLoading] = useState(true);
    const [newListings, setNewListings] = useState([]);
    const [newListingsLoading, setNewListingsLoading] = useState(true);
    const [landVideo, setLandVideo] = useState('');
    const [landImage, setLandImage] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    const responsive = {
        0: { items: 1 },
        1024: { items: 4 }
    };

    useEffect(() => setRandomLandVideoOrImage(), []);
    useEffect(() => {
        const fetchLastPurchases = () => {
            axios.get(`${MARKET_PURCHASE_API}/purchases`)
                .then(({ data }) => setLastPurchases(mapLastPurchases(data.filter(({ item_id }) => item_id !== 3306))))
                .catch(error => console.log(error))
                .finally(() => setLastPurchasesLoading(false));
        };

        fetchLastPurchases();
    }, []);
    useEffect(() => {
        const fetchNewListingsPurchases = () => {
            axios.get(`${SALE_ORDERS_API}/last-listings`)
                .then(({ data }) => setNewListings(mapNewListings(data.filter(({ item_id }) => item_id !== 3306))))
                .catch(error => console.log(error))
                .finally(() => setNewListingsLoading(false));
        };

        fetchNewListingsPurchases();
    }, []);

    const mapNewListings = (items) => {
        return items
            .map(({ data: { name, ipfs, mediaUrl }, price, item_id, collection }) => {
                return <HomeItem
                    ipfs={ipfs}
                    mediaUrl={mediaUrl}
                    name={name}
                    price={price}
                    item_id={item_id}
                    collection={collection}
                />
            });
    };

    const mapLastPurchases = (items) => {
        return items
            .map(({ id, price, collection, data: { name, ipfs, mediaUrl } }) => {
                return <HomeItem
                    purchaseId={id}
                    ipfs={ipfs}
                    mediaUrl={mediaUrl}
                    name={name}
                    price={price}
                    collection={collection}
                />
            });
    };

    //const mouseOver = (e) => e.target.play()
    //    .catch((e) => onErrorSetDefaultVideoLand(e));

    //const mouseOut = (e) => e.target.pause()
    //    .catch((e) => onErrorSetDefaultVideoLand(e));

    // const onErrorSetDefaultVideoLand = (error) => {
    //     console.log(error);
    //     setLandVideo(LegendaryLandImage);
    // };

    const setRandomLandVideoOrImage = () => {
        if (window.innerWidth <= 1024) {
            const images = [
                CommonLandImage,
                EpicLandImage,
                LegendaryLandImage,
                MythicalLandImage,
                RareLandImage
            ];

            setLandImage(images[Math.floor(Math.random() * images.length)]);
            setIsMobile(true);
        } else {
            const videos = [
                CommonLandVideo,
                EpicLandVideo,
                LegendaryLandVideo,
                MythicalLandVideo,
                RareLandVideo
            ];

            setLandVideo(videos[Math.floor(Math.random() * videos.length)]);
        }
    };

    return (
        <div className={'home-container'}>
            <div className={'home-container-head'}>
                <div className={'home-container-heading'}>
                    <h1>New Events</h1>
                    <div className={'home-head-line'} />
                </div>

                <div className={'home-container-head-content'}>

                    <div className={'home-container-head-single'}>
                        <div className={'head-single-info'}>
                            <h2>Dark Country</h2>
                            <h2>Lands Unpacking</h2>
                            <p>Launched!</p>
                        </div>
                        <a href="https://flow.darkcountry.io/unpacker/land" target="_blank" rel="noreferrer">
                            { isMobile
                                ? <img src={landImage} alt="dc-land" />
                                : <video
                                    src={landVideo ? landVideo : LegendaryLandVideo}
                                    loop={true}
                                    muted={true}
                                    autoPlay={true}
                                />
                            }
                        </a>
                    </div>

                    <div className={'home-container-head-single'}>
                        <div className={'head-single-info'}>
                            <h2>Dark Country</h2>
                            <h2>Cards & Heroes Drop</h2>
                            <p>Coming soon!</p>
                        </div>
                        <a href="https://darkcountry.io" target="_blank" rel="noreferrer">
                            <img src={UpcomingDrop1Image} alt="" />
                        </a>
                    </div>
                </div>
            </div>

            <div className={'home-block live-auctions'}>
                <div className={'home-block-heading'}>
                    <h1>New Listings</h1>
                    <div className={'home-head-line'} />
                    {/*<p>View All</p>*/}
                </div>

                { newListingsLoading
                    ? <ItemsLoadingPlaceholder amount={isMobile ? 1 : 4} />
                    : <>
                        { newListings.length
                            ? <div className={'home-block-content'}>
                                <AliceCarousel
                                    mouseTracking
                                    items={newListings}
                                    responsive={responsive}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlayStrategy={'action'}
                                    autoPlayInterval={2000}/>
                            </div>
                            : <></>
                        }
                    </>
                }
            </div>

            <div className={'home-block top-collection'}>
                <div className={'home-block-heading'}>
                    <h1>Last Purchases</h1>
                    <div className={'home-head-line'} />
                    {/*<p>View All</p>*/}
                </div>

                { lastPurchasesLoading
                    ? <ItemsLoadingPlaceholder amount={isMobile ? 1 : 4} />
                    : <div className={'home-block-content'}>
                        <AliceCarousel
                            items={lastPurchases}
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlayStrategy={'action'}
                            autoPlayInterval={3000}
                        />
                    </div>
                }
            </div>

        </div>
    )
}

export default HomeContainer
