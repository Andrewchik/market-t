import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


import NavBar from "../../components/NavBar/NavBar";

import './HowItWorks.scss';


const HowItWorks = () => {
    // const [activeSection, setActiveSection] = useState(1);
    //
    // const handleNavigationClick = (sectionNumber) => {
    //     setActiveSection(sectionNumber);
    // };

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
        1480: { items: 4 },
        1936: { items: 5 },
        2392 : { items: 6 },
    };

    const items = [
        <div className="how-it-works_container_item">
            <div className="img-block_1"></div>
            <div className="item-content">
                <h5>You make promo activities</h5>
                <p>to receive free tools and houses (farming houses) No bots, threshold to be added via twitter verification</p>
            </div>
        </div>,
        <div className="how-it-works_container_item">
            <div className="img-block_2"></div>
            <div className="item-content">
                <h5>You put items into houses</h5>
                <p>to start farming resources and increase workplace efficiency</p>
            </div>
        </div>,
        <div className="how-it-works_container_item">
            <div className="img-block_3"></div>
            <div className="item-content">
                <h5>You can use resources</h5>
                <p>to upgrade your items, staking into pool or exchange to RTP token</p>
            </div>
        </div>,
        <div className="how-it-works_container_item">
            <div className="img-block_4"></div>
            <div className="item-content">
                <h5>RTP token</h5>
                <p>There is a certain amount of RTP token to be produced via trading fees</p>
            </div>
        </div>,
        <div className="how-it-works_container_item">
            <div className="img-block_5"></div>
            <div className="item-content">
                <h5>You receive Science Points </h5>
                <p>while working on workplaces that are necessary to advance to the next Technological era</p>
            </div>
        </div>,
        <div className="how-it-works_container_item">
            <div className="img-block_6"></div>
            <div className="item-content">
                <h5>Starting new Era</h5>
                <p>will grant you a percentage of all resources that players will spend to upgrade their tools and workplaces</p>
            </div>
        </div>,
    ];

    return (
        <div className="how-it-works_container">
            <NavBar />
            <div className="how-it-works_container_list">
                <h2>How it Works?</h2>
                <div className="list_items">
                    <AliceCarousel
                        autoPlay
                        mouseTracking
                        disableDotsControls
                        items={items}
                        responsive={responsive}
                        paddingLeft={10}
                        paddingRight={10}
                        infinite={true}
                        autoPlayStrategy="none"
                        autoPlayInterval={1000}
                        animationDuration={1000}
                        // autoPlayInterval={2000}/>
                    />
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
