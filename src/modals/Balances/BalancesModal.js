import React from "react";
import Rodal from "rodal";
// import axios from "axios";
// import {Button} from "@material-ui/core";
// import {Link} from "@imtbl/imx-sdk";

import CustomButton from "../../generics/CustomButton/CustomButton";
// import EthIcon from  '../../resources/images/eth_icon.png'


import './BalancesModal.scss'





function BalancesModal({handleClose, visible, address}) {
    // const link = new Link(process.env.SANDBOX_LINK_URL)

    // const [balanceInfo, setBalanceInfo] = useState([])
    // const [selectedCrypto, setSelectedCrypto] = useState(null);


    // useEffect(async () => {
    //     if (address){
    //         await axios.get(`https://api.sandbox.x.immutable.com/v2/balances/${address?.address}`)
    //             .then(({data: {result}}) => setBalanceInfo(result))
    //     }
    // }, [address])

    // const weiToEth = (wei) => {
    //     return parseFloat(wei / 10 ** 18).toFixed(6);
    // };

    const handlerDeposit = () => {
    //    link.deposit({})
    };

    const shortEthAddres = (address) => {
        if (typeof address === "string")
            return "0x" + address.substring(0, 4) + "..." + address.substring(36);
    }

    return (
        <Rodal
            visible={ visible }
            onClose={ handleClose }
            showCloseButton={ true }
            className="balances-modal-box"
            animation="slideUp"
            duration={ 800 }
            closeOnEsc={ false }
        >
                <div className="balances_modal-wrapper">
                    <div className="header-wallet">
                        <h4>{shortEthAddres(address?.address)}</h4>
                    </div>

                    <div className="balance-content">
                        {/* {balanceInfo.map((item, index) =>
                            <div className={"balances-item" + (selectedCrypto === item ? " available" : "")} key={index} onClick={() => setSelectedCrypto(item)}>
                            <div className={"balances-item_left"}>
                                    <p className={'amount'}>{ item.symbol === 'ETH' ? weiToEth(item.balance): item.balance}</p>
                                    <p className={'usd'}>($0 USD)</p>
                                </div>
                                <div className="balances-item_right">
                                    <div className="symbol-img">
                                        { item.symbol === 'ETH' && <img src={EthIcon} alt="eth"/> }
                                    </div>
                                    <p className={'symbol'}>{item.symbol}</p>
                                </div>
                            </div>
                        )} */}
                    </div>

                </div>
            <div className="balances_modal-buttons">
                <CustomButton
                    text={'Add funds'}
                    onClick={ handlerDeposit }
                />
                {/* <Button
                    variant={'text'}
                    className={'withdraw-btn'}
                    onClick={ () => {} }
                    disabled={true}
                >
                    Withdraw
                </Button> */}
            </div>
        </Rodal>
    );
}

export default BalancesModal;
