import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './RoadMap.scss';
import dropIcon from '../../images/roadmap/drop_1.png'
import farmingIcon from '../../images/roadmap/farming.png'
import launchIcon from '../../images/roadmap/launch.png'
import poolIcon from '../../images/roadmap/pool.png'
import tradeIcon from '../../images/roadmap/trade.png'

const RoadMap = () => {
    // const [activeSection, setActiveSection] = useState(1);
    //
    // const handleNavigationClick = (sectionNumber) => {
    //     setActiveSection(sectionNumber);
    // };

    return (
        <div className="roadmap_container">
            <NavBar />
            <div className="roadmap_content">
                <ul className="roadmap_content_line">
                    <li>
                        <div className="roadmap_content_line-item">
                            <div className="number">
                                <p>01</p>
                            </div>
                            <div className="img">
                                <img src={launchIcon} alt=""/>
                            </div>
                            <div className="name">
                                <p>Product Launch </p>
                            </div>

                            <div className="ellipse">
                                <div className="ellipse_2"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="roadmap_content_line-item">
                            <div className="ellipse">
                                <div className="ellipse_2"></div>
                            </div>
                            <div className="name">
                                <p>Initial Items and houses drop </p>
                            </div>
                            <div className="img">
                                <img src={dropIcon} alt=""/>
                            </div>
                            <div className="number">
                                <p>02</p>
                            </div>

                        </div>
                    </li>
                    <li>
                        <div className="roadmap_content_line-item">
                            <div className="number">
                                <p>03</p>
                            </div>
                            <div className="img">
                                <img src={farmingIcon} alt=""/>
                            </div>
                            <div className="name">
                                <p>Resource Farming</p>
                            </div>

                            <div className="ellipse">
                                <div className="ellipse_2"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="roadmap_content_line-item">
                            <div className="ellipse">
                                <div className="ellipse_2"></div>
                            </div>
                            <div className="name">
                                <p>RTP Farming via Trading</p>
                            </div>
                            <div className="img">
                                <img src={tradeIcon} alt=""/>
                            </div>
                            <div className="number">
                                <p>04</p>
                            </div>

                        </div>
                    </li>
                    <li>
                        <div className="roadmap_content_line-item">
                            <div className="number">
                                <p>05</p>
                            </div>
                            <div className="img">
                                <img src={poolIcon} alt=""/>
                            </div>
                            <div className="name">
                                <p>Resource Pools</p>
                            </div>

                            <div className="ellipse">
                                <div className="ellipse_2"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="roadmap_content_line-item">
                            <div className="ellipse">
                                <div className="ellipse_2"></div>
                            </div>
                            <div className="name">
                                <p>Regular adding a new era</p>
                            </div>
                            <div className="number">
                                <p>06</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RoadMap;
