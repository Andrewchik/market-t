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
        return <ReactPlayer
            url={ getLandVideoByName(name, ipfs) }
            width={videoStyle.width}
            height={videoStyle.height}
            style={videoStyle.style}
            playing={true}
            loop={true}
        />;

    if ([RANCHO_PACK_IPFS, GOVERNORS_PACK_IPFS, MAYORS_PACK_IPFS, BONUS_PACK_IPFS].includes(ipfs) && showVideo)
        return <ReactPlayer
            url={ `https://ipfs.io/ipfs/${ipfs}` }
            width={videoStyle.width}
            height={videoStyle.height}
            style={videoStyle.style}
            playing={true}
            loop={true}
        />;

    switch (ipfs) {
        case RANCHO_PACK_IPFS:
            return <img src={ RanchoPackImage } alt="" />;

        case GOVERNORS_PACK_IPFS:
            return <img src={ GovernorsPackImage } alt="" />;

        case MAYORS_PACK_IPFS:
            return <img src={ MayorsPackImage } alt="" />;

        case BONUS_PACK_IPFS:
            return <img src={ BonusPackImage } alt="" />;
    }

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
