import React, { useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './NFTs.scss';

const nftImages = [
    { name: 'Boats_mooring', src: require('../../images/NFTs/Boats_mooring.png') },
    { name: 'Army_forge', src: require('../../images/NFTs/Army_forge.png') },
    { name: 'Bone_hoe', src: require('../../images/NFTs/Bone_hoe.png') },
    { name: 'Chopper_1', src: require('../../images/NFTs/Chopper_1.png') },
    { name: 'farm_hut', src: require('../../images/NFTs/farm_hut.png') },
    { name: 'Farmer_hut', src: require('../../images/NFTs/Farmer_hut.png') },
    { name: 'forge_of_bronze_smelting', src: require('../../images/NFTs/forge_of_bronze_smelting.png') },
    { name: 'Hand_axe', src: require('../../images/NFTs/Hand_axe.png') },
    { name: '-03-06_10-34-12', src: require('../../images/NFTs/photo_2023-03-06_10-34-12.png') },
    { name: 'pier_for_rafts', src: require('../../images/NFTs/pier_for_rafts.png') },
    { name: 'simple_sawmill', src: require('../../images/NFTs/simple_sawmill.png') },
    { name: 'Stonemason_wooden_hut', src: require('../../images/NFTs/Stonemason_wooden_hut.png') },
    { name: 'weaving_workshop', src: require('../../images/NFTs/weaving_workshop.png') },
    { name: 'wheelbarrow', src: require('../../images/NFTs/wheelbarrow.png') },
    { name: 'Woodcutter_house', src: require('../../images/NFTs/Woodcutter_house.png') },
    { name: 'Wooden_warehouse', src: require('../../images/NFTs/Wooden_warehouse.png') },
    { name: 'Wooden_tailor_house', src: require('../../images/NFTs/Wooden_tailor_house.png') },
    { name: 'Wooden_stable', src: require('../../images/NFTs/Wooden_stable.png') },
    { name: 'Wooden_barracks', src: require('../../images/NFTs/Wooden_barracks.png') },
    { name: 'wooden_raft', src: require('../../images/NFTs/wooden_raft.png') },
    { name: 'chopping_tools', src: require('../../images/NFTs/chopping_tools.png') },
];

const NFTs = () => {
    const [activeSection, setActiveSection] = useState(1);

    const handleNavigationClick = (sectionNumber) => {
        setActiveSection(sectionNumber);
    };

    return (
        <div className="nfts_container">
            <NavBar />
            <div className="nfts_list">
                {nftImages.map((image, index) => (
                    <div key={index} className="nfts_list-item">
                        <img src={image.src} alt={image.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTs;