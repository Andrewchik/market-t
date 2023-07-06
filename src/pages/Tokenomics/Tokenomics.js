import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import diagramImg from '../../images/diagram.png'

import './Tokenomics.scss';


const Tokenomics = () => {
    // const [activeSection, setActiveSection] = useState(1);
    //
    // const handleNavigationClick = (sectionNumber) => {
    //     setActiveSection(sectionNumber);
    // };

    return (
        <div className="tokenomics_container">
            <NavBar />
            <div className="tokenomics_content">
                <div className="tokenomic_content-diagram">
                    <img src={diagramImg} alt=""/>
                    <span>50M</span>
                </div>
                <div className="green-line_blck">
                    <p>40% to be distributed via daily pools</p>
                    <p>(resources to exchange for RTP)</p>
                </div>
                <div className="pink-line_blck">
                    <p>40% to be mined via trading</p>
                    <p>(every buyer received a chunk of RTP token)</p>
                </div>
                <div className="purple-line_blck">
                    <p>15% provided into LP farming</p>
                </div>
                <div className="orange-line_blck">
                    <p>5% salaries (community managers)</p>
                </div>
            </div>
        </div>
    );
};

export default Tokenomics;
