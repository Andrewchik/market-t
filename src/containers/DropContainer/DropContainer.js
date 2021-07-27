import './DropContainer.scss';

import HeaderLine from "../../resources/images/header_line.png";
import RanchoPack from "../../resources/images/packs/Rancho.png";

import CustomButton from "../../generics/CustomButton/CustomButton";

export default function DropContainer() {
    return (
        <div className={'drop-container-wrapper'}>
            <div className={'drop-container-content'}>
                <h3>Mystic Drop</h3>
                <img className={'line'} src={HeaderLine} alt="line" />
                <div className={'drop'}>
                    <img src={RanchoPack} alt="drop" />
                </div>
                <div className={'drop-info'}>
                    <div className={'drop-info-row'}>
                        <p>Author</p>
                        <p>Mythical Seller</p>
                    </div>
                    <div className={'drop-info-row'}>
                        <p>Limit per user</p>
                        <p>10</p>
                    </div>
                    <div className={'drop-info-row'}>
                        <p>Cooldown period</p>
                        <p>60 sec</p>
                    </div>
                    <div className={'drop-info-row'}>
                        <p>Available</p>
                        <p>1000 / 1000</p>
                    </div>
                    <div className={'drop-info-inside'}>
                        <h3>What inside:</h3>
                        <ul>
                            <li>40% chance on Common Card</li>
                            <li>20% chance on Rare Card</li>
                            <li>5% chance on Epic Card</li>
                            <li>1% chance on Legendary Card</li>
                            <li>0.1% chance on Mythical Card</li>
                        </ul>
                        <p>+ Bonus 1000 tokens</p>
                    </div>
                    <div className={'drop-price'}>
                        <p>Price 1.5 FLOW</p>
                        <div className={'drop-price-actions'}>
                            <input type="number" />
                            <CustomButton
                                text={'Buy'}
                                onClick={ () => {} }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
