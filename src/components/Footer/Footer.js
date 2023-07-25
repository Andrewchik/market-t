import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as fcl from "@onflow/fcl";
import React from "react";

import './Footer.scss';
import logo from "../../resources/images/logos/TopExpo_LOGO1_2.webp";

const Footer = ({ burnStat }) => {
    const history = useHistory();
    const user = useSelector(({ auth }) => auth.auth);

    const handleInventoryClick = () => {
        if (user && user.address) {
            history.push(`/profile/${user.address}`);
        } else {
            fcl.authenticate();
        }
    };

    const calculateBurnedFees = () => {
        if (burnStat && burnStat.burned_amount && burnStat.burning_symbol) {
            const burnedAmount = burnStat.burned_amount;
            const burningSymbol = burnStat.burning_symbol.split(",")[0];
            return burnedAmount / Math.pow(10, burningSymbol);
        }
        return 0;
    };

    return (
        <div className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-description">
                    <img src={logo} alt="logo" />
                    <h3>NFT Marketplace</h3>
                </div>

                <div className="footer-explore">
                    <h3>Explore</h3>
                    <Link to="/market">
                        <p>Market</p>
                    </Link>
                    <p onClick={handleInventoryClick}>My Inventory</p>
                </div>

                <div className="footer-follow">
                    <h3>Follow us</h3>
                    <p>
                        <a
                            href="https://twitter.com/NFTTopExpo"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Twitter
                        </a>
                    </p>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>
                        <a href="mailto:contact@topexpo.io">Email</a>
                    </p>
                </div>
            </div>
            <div className="burned-fees">
                <p>TopExpo.io is a marketplace for NFTs based on Flow <br /> blockchain.</p>
                {calculateBurnedFees() !== 0 ? (
                    <p>Total SDM fees burned: {calculateBurnedFees()}</p>
                ) : null}
            </div>
        </div>
    );
};

export default Footer;
