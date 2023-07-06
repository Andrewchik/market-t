import React from 'react';


import './header.scss'

const Header = () => {
    return (
        <header className={'header'}>
            <nav className="nav">
                <a href="#" className="nav__item">Features</a>
                <a href="#" className="nav__item">How it works</a>
                <a href="#" className="nav__item">Roadmap</a>
                <a href="#" className="nav__item">Tokenomics</a>
                <a href="#" className="nav__item">NFT</a>
            </nav>
        </header>
    );
};

export default Header;
