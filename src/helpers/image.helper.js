import React from "react";
import ReactPlayer from 'react-player/lazy';

import RanchoPackImage from '../resources/images/packs/Rancho.png';
import GovernorsPackImage from '../resources/images/packs/Governor.png';
import MayorsPackImage from '../resources/images/packs/Mayor.png';
import BonusPackImage from '../resources/images/packs/Bonus.png';

import CommonLandVideo from "../resources/videos/Common__xvid.mp4";
import EpicLandVideo from "../resources/videos/Epic__xvid.mp4";
import LegendaryLandVideo from "../resources/videos/Legendary__xvid.mp4";
import MythicalLandVideo from "../resources/videos/Mithycal__xvid.mp4"
import RareLandVideo from "../resources/videos/Rare__xvid.mp4";

import CommonLandImage from "../resources/images/lands/Common__xvid.b6df2fac.jpg";
import EpicLandImage from "../resources/images/lands/Epic__xvid.d15929ea.jpg";
import LegendaryLandImage from "../resources/images/lands/Legendary__xvid.d534466a.jpg";
import MythicalLandImage from "../resources/images/lands/Mithycal__xvid.b7d97282.jpg";
import RareLandImage from "../resources/images/lands/Rare__xvid.b478551e.jpg";

import {
    RANCHO_PACK_IPFS,
    GOVERNORS_PACK_IPFS,
    MAYORS_PACK_IPFS,
    BONUS_PACK_IPFS,
    COMMON_LAND,
    RARE_LAND,
    EPIC_LAND,
    LEGENDARY_LAND,
    MYTHICAL_LAND
} from "../constants";

export const renderDarkCountryItemImageOrVideo = (ipfs, mediaUrl, name, showVideo, videoStyle) => {
    if (!!mediaUrl)
        return <img src={ mediaUrl } alt="" />;

    if ([COMMON_LAND, RARE_LAND, EPIC_LAND, LEGENDARY_LAND, MYTHICAL_LAND].includes(name))
        return showVideo && window.innerWidth > 1024
            ? <ReactPlayer
                url={ getLandVideoByName(name, ipfs) }
                width={videoStyle.width}
                height={videoStyle.height}
                style={videoStyle.style}
                playing={true}
                loop={true}
            />
            : <img src={ getLandImageByName(name) } alt="" />;

    if ([RANCHO_PACK_IPFS, GOVERNORS_PACK_IPFS, MAYORS_PACK_IPFS, BONUS_PACK_IPFS].includes(ipfs) && showVideo)
        return <ReactPlayer
            url={ `https://ipfs.io/ipfs/${ipfs}` }
            width={videoStyle.width}
            height={videoStyle.height}
            style={videoStyle.style}
            playing={true}
            loop={true}
        />;

    if (ipfs === RANCHO_PACK_IPFS)
        return <img src={ RanchoPackImage } alt="" />;

    if (ipfs === GOVERNORS_PACK_IPFS)
        return <img src={ GovernorsPackImage } alt="" />;

    if (ipfs === MAYORS_PACK_IPFS)
        return <img src={ MayorsPackImage } alt="" />;

    if (ipfs === BONUS_PACK_IPFS)
        return <img src={ BonusPackImage } alt="" />;

    return <img src={ `https://ipfs.io/ipfs/${ipfs}` } alt="" />;
};

const getLandVideoByName = (name, ipfs) => {
    switch (name) {
        case COMMON_LAND:
            return CommonLandVideo;

        case RARE_LAND:
            return RareLandVideo;

        case EPIC_LAND:
            return EpicLandVideo;

        case LEGENDARY_LAND:
            return LegendaryLandVideo;

        case MYTHICAL_LAND:
            return MythicalLandVideo;

        default:
            return `https://ipfs.io/ipfs/${ipfs}`;
    }
};

const getLandImageByName = (name) => {
    switch (name) {
        case COMMON_LAND:
            return CommonLandImage;

        case RARE_LAND:
            return RareLandImage;

        case EPIC_LAND:
            return EpicLandImage;

        case LEGENDARY_LAND:
            return LegendaryLandImage;

        case MYTHICAL_LAND:
            return MythicalLandImage;

        default:
            return '';
    }
};
