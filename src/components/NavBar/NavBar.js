import React from 'react';


import './NavBar.scss';

const NavBar = ({active = false}) => {
    // const [activeSection, setActiveSection] = useState(1);

    // const handleNavigationClick = (sectionNumber) => {
    //     setActiveSection(sectionNumber);
    // };


    return (
            <div className="navigation">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">How it works</a></li>
                    <li><a href="#">Roadmap</a></li>
                    <li><a href="#">Tokenomics</a></li>
                    <li><a href="#">NFTs</a></li>
                </ul>
            </div>
    );
};

export default NavBar;
