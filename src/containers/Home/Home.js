import React, {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";

import axios from "axios";

import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';

import UpcomingDrop1Image from "../../resources/images/Drop Cards.webp";
import CommonLandImage from "../../resources/images/lands/Common__xvid.b6df2fac.webp";
import EpicLandImage from "../../resources/images/lands/Epic__xvid.d15929ea.webp";
import LegendaryLandImage from "../../resources/images/lands/Legendary__xvid.d534466a.webp";
import MythicalLandImage from "../../resources/images/lands/Mithycal__xvid.b7d97282.webp";
import RareLandImage from "../../resources/images/lands/Rare__xvid.b478551e.webp";

import CommonLandVideo from "../../resources/videos/Common__xvid.mp4";
import EpicLandVideo from "../../resources/videos/Epic__xvid.mp4";
import LegendaryLandVideo from "../../resources/videos/Legendary__xvid.mp4";
import MythicalLandVideo from "../../resources/videos/Mithycal__xvid.mp4"
import RareLandVideo from "../../resources/videos/Rare__xvid.mp4";

import './Home.scss';
import '../../components/HomeItem/HomeItem.scss';

import HomeItem from "../../components/HomeItem/HomeItem";
import ItemsLoadingPlaceholder from "../../components/LoadingPlaceholders/ItemsLoadingPlaceholder/ItemsLoadingPlaceholder";
import CustomSecondButton from "../../generics/CustomSecondButton/CustomSecondButton"

import {SALE_ORDERS_API, MARKET_PURCHASE_API} from "../../constants";

import {UALContext} from "ual-reactjs-renderer";
import HomeWaxItem from "../../components/HomeWaxItem/HomeWaxItem";

export default function Home() {
    
    const { userImxItems: userWaxItems } = useSelector(({ user }) => user);


    const { activeUser } = useContext(UALContext);
    const [lastPurchases, setLastPurchases] = useState([]);
    const [newListingsPurchases, setNewListingsPurchases] = useState([]);
    const [lastPurchasesIMX, setLastPurchasesIMX] = useState([]);
    const [lastPurchasesLoading, setLastPurchasesLoading] = useState(true);
    const [newListings, setNewListings] = useState([]);
    const [newListingsWax, setNewListingsWax] = useState([]);
    const [newListingsLoading, setNewListingsLoading] = useState(true);
    const [landVideo, setLandVideo] = useState('');
    const [landImage, setLandImage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [selectedBlockchain, setSelectedBlockchain] = useState('Flow');

    const responsive = {
        0: { items: 1 },
        1024: { items: 4 }
    };

    // const weiToEth = (wei) => {
    //     return parseFloat(wei / 1e18);
    // };

    useEffect(() => setRandomLandVideoOrImage(), []);
    // useEffect(() => {
    //     const fetchLastPurchasesIMX = () => {
    //         axios.get(`${IMMUTABLE_SANDBOX_API}/orders?page_size=10&status=filled&&sell_token_type=ETH`)
    //             .then(({ data: {result} }) => setLastPurchasesIMX(mapLastPurchasesIMX(result)))
    //             .catch(error => console.log(error))
    //             .finally(() => setLastPurchasesLoading(false));
    //     };
    
    //     if (!activeUser)
    //     fetchLastPurchasesIMX();
    
    // }, []);

    // useEffect(() => {
    //     setLastPurchasesWAX(mapLastPurchasesWAX(userWaxItems))
    // }, [])

    // useEffect(() => {
    //     const fetchNewListingsPurchasesIMX = () => {
    //         axios.get(`${IMMUTABLE_SANDBOX_API}/orders?page_size=10&status=active&&buy_token_type=ETH&&order_by="created_at"`)
    //             .then(({ data: {result} }) => setNewListingsPurchases(mapLastPurchasesIMX(result)))
    //             .catch(error => console.log(error))
    //             .finally(() => setNewListingsPurchasesLoading(false));
    //     };
    //
    //     if (!activeUser)
    //         fetchNewListingsPurchasesIMX();
    //
    // }, []);


    useEffect(() => {
        const fetchLastPurchases= () => {
            axios.get(`${MARKET_PURCHASE_API}/purchases`)
                .then(({ data }) => setLastPurchases(mapLastPurchases(data)))
                .catch(error => console.log(error))
                .finally(() => setLastPurchasesLoading(false));
        };

        fetchLastPurchases();
    }, []);
    useEffect(() => {
        const fetchNewListingsPurchases = () => {
            axios.get(`${SALE_ORDERS_API}/last-listings`)
                .then(({ data }) => setNewListings(mapNewListings(data)))
                .catch(error => console.log(error))
                .finally(() => setNewListingsLoading(false));
        };

        fetchNewListingsPurchases();
    }, []);

    useEffect(() => {
        setNewListingsWax(mapLastPurchasesWAX(userWaxItems))
    }, [userWaxItems])

    console.log(newListingsWax);
    console.log(newListings);

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

    // const shortenString = (str) => {
    //     if (!str) {
    //         return '';
    //     }
    //     const words = str.split(' ');
    //     if (words.length <= 2) {
    //         return str;
    //     } else {
    //         return words.slice(0, 2).join(' ');
    //     }
    // }


    // const mapLastPurchasesIMX = (items) => {
    //     return items
    //         .map(({ order_id, sell, buy, status }) => {
    //             const mediaUrl = sell?.data?.properties?.image_url || buy?.data?.properties?.image_url;
    //             const name = shortenString(sell?.data?.properties?.name) || shortenString(buy?.data?.properties?.name);
    //             const collection = sell?.data?.properties?.collection?.name || buy?.data?.properties?.collection?.name;
    //             const price = sell?.data?.properties && weiToEth(buy?.data?.quantity) || buy?.data?.properties && weiToEth(sell?.data?.quantity);
    //             const symbol = sell?.data?.symbol || buy?.data?.symbol;

    //             if (price === 1) {
    //                 return null;
    //             }

    //             return (
    //                 <HomeIMXItem
    //                     purchaseId={order_id}
    //                     symbol={symbol}
    //                     mediaUrl={mediaUrl}
    //                     name={name}
    //                     price={price}
    //                     collection={collection}
    //                     status={status}
    //                 />
    //             );
    //         });
    // };

        const mapLastPurchasesWAX = () => {
        return userWaxItems
            .map(({ asset_ids, collection_name, sale_id, listing_price }) => {

                let name = asset_ids[0].data.name;
                let ipfs = asset_ids[0].data.img;



                return (
                    <HomeWaxItem
                    ipfs={ipfs}
                    mediaUrl={ipfs}
                    name={name}
                    price={listing_price}
                    item_id={sale_id}
                    collection={collection_name}
                />
                );
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
                        <a href="https://darkcountry.io" target="_blank" rel="noreferrer" aria-label="drop">
                            <img src={UpcomingDrop1Image} alt="" />
                        </a>
                    </div>
                </div>
            </div>

            <div className={'home-block live-auctions'}>
                <div className={'home-block-heading'}>
                    <h1>New Listings</h1>
                    <div className={'home-head-line'} />
                    <div className="blockchain-buttons">
                        <CustomSecondButton text={'FLOW'}  onClick={ () => {setSelectedBlockchain('Flow')} } borderButton={selectedBlockchain !== 'Flow'} />
                        <CustomSecondButton text={'WAX'}  onClick={ () => {setSelectedBlockchain('Wax')} } borderButton={selectedBlockchain !== 'Wax'} />
                      
                        {/*<CustomSecondButton*/}
                        {/*    text={'ImmutableX'}*/}
                        {/*    onClick={ () => {setSelectedBlockchain('Immutable')} }*/}
                        {/*    borderButton={selectedBlockchain !== 'Immutable'}*/}
                        {/*/>*/}
                        {/*<CustomSecondButton*/}
                        {/*    text={'WAX'}*/}
                        {/*    onClick={ () => {setSelectedBlockchain('WAX')} }*/}
                        {/*    borderButton={selectedBlockchain !== 'WAX'}*/}
                        {/*/>*/}
                    </div>
                    {/*<p>View All</p>*/}
                </div>

                { newListingsLoading
                    ? <ItemsLoadingPlaceholder amount={isMobile ? 1 : 4} />
                    : <>
                        { newListings.length
                            ? <div className={'home-block-content'}>
                                <AliceCarousel
                                    mouseTracking
                                    items={selectedBlockchain === 'Flow' ? newListings : newListingsWax}
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
                    <div className="blockchain-buttons">
                        {/*<CustomSecondButton*/}
                        {/*    text={'Flow'}*/}
                        {/*    onClick={ () => {setSelectedBlockchain('Flow')} }*/}
                        {/*    borderButton={selectedBlockchain !== 'Flow'}*/}
                        {/*/>*/}
                        {/*<CustomSecondButton*/}
                        {/*    text={'ImmutableX'}*/}
                        {/*    onClick={ () => {setSelectedBlockchain('Immutable')} }*/}
                        {/*    borderButton={selectedBlockchain !== 'Immutable'}*/}
                        {/*/>*/}
                    </div>
                    {/*<p>View All</p>*/}
                </div>

                { lastPurchasesLoading
                    ? <ItemsLoadingPlaceholder amount={isMobile ? 1 : 4} />
                    : <div className={'home-block-content'}>
                        <AliceCarousel
                            items={selectedBlockchain === 'Flow' ? lastPurchases : lastPurchases}
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            // autoPlayStrategy={'action'}
                            autoPlayInterval={3000}
                        />
                    </div>
                }
            </div>

        </div>
    )
}
