import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as fcl from "@onflow/fcl";

import './Footer.scss'

import logo from "../../resources/images/TopExpo_LOGO1_2.png";

function Footer() {
    const history = useHistory();
    const user = useSelector(({ auth }) => auth.auth);

    return (
        <div className={'footer-wrapper'}>
            <div className={'footer-container'}>
                <div className={'footer-description'}>
                    <img src={logo} alt="logo" />
                    <h3>NFT Marketplace</h3>
                    <p>
                        TopExpo.io is a marketplace for NFTs based on Flow blockchain.
                    </p>
                </div>
                <div className={'footer-explore'}>
                    <h3>Explore</h3>
                    <Link to={'/market'}>
                        <p>Market</p>
                    </Link>
                    <p onClick={ user && user.address
                        ? () => history.push(`/profile/${user.address}`)
                        : () => fcl.authenticate()
                    }>My Inventory</p>
                </div>
                <div className={'footer-contact'}>
                    <h3>Follow us</h3>
                    <p><a href="https://twitter.com/NFTTopExpo" target={'_blank'}>Twitter</a></p>
                </div>
                <div className={'footer-contact'}>
                    <h3>Contact</h3>
                    <p><a href="mailto:contact@topexpo.io">Email</a></p>
                </div>
            </div>
        </div>
    )
}

export default Footer
