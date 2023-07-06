import React, {useState} from 'react';
import vectorMainImg from '../../images/vectors/main-bottom-vector.png'
import LogoImg from '../../images/RUSH_logo.png'

import Header from "../../components/Header/Header";


import './main.scss'


const Main = () => {
    const [onMouseEnter, setOnMouseEnter] = useState(true)
    return (
            <div className="main-container">
                <Header/>
                <div className="main-logo">
                    <img src={LogoImg} alt=""/>
                </div>
                <div className="main-start-journey">
                    <img src={vectorMainImg} alt=""/>
                    <div className="main-content">
                        <h1>START YOUR JOURNEY NOW!</h1>
                        <button className={onMouseEnter ? 'start-btn' : 'start-btn-hover'} onMouseEnter={() => setOnMouseEnter(!onMouseEnter)} onMouseOut={() => setOnMouseEnter(!onMouseEnter)}>
                            JOIN EARLY
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Main;
