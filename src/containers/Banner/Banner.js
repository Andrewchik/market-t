import React from 'react'

import CustomButton from "../../generics/CustomButton/CustomButton";
import {useHistory} from "react-router-dom";

import './Banner.scss';




export default function Banner({ topTitle, title, text, btnText, image, link }) {

    const history = useHistory();

    const goLink = () => {
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            history.push(link);
        }
    }

    return (
        <div className={'home-container-head-item'}>
            <div className="home-container-head_content">
                <div className={'home-container-now-live'}>
                    <div className="home-container-now-live_up">
                        <span>{topTitle}</span>
                        <div className={'home-head-line'} />
                    </div>
                    <div className="now-live-content">
                        <h4>{title}</h4>
                        <p>{text}</p>
                        <CustomButton
                            text={btnText}
                            onClick={ goLink }
                        />
                    </div>
                </div>
                <div className={'home-container-head-banner'}>
                    <div className="banner-image">
                        <img src={image} alt=""/>
                    </div>
                </div>
                {/*<div className="next-banner">*/}
                {/*    <img src={ArrowRight} alt=""/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
