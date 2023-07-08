import {useEffect, useRef, useState} from "react";
import { useHistory } from "react-router-dom";

import { Accordion, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import FlowIcon from "../../../resources/images/blockchain/flow_icon.png";
import SDMIcon from "../../../resources/images/blockchain/sdm_icon.png";
import WAXIcon from "../../../resources/images/blockchain/wax_icon.png";

import './BlockchainFilter.scss'


function BlockchainFilter({blockchainSelected, setBlockchainSelected, tokenSelected, setTokenSelected}) {
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const [tokenExpanded, setTokenExpanded] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(history.location.search);
        const blockchain = queryParams.get("blockchain");
        if (blockchain) {
            setBlockchainSelected(blockchain);
        }
    }, [history, setBlockchainSelected]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);



    const blockchains = [
        {id: 1, name: 'Flow blockchain', img: FlowIcon, click: () => {handleSelectedBlockchain('Flow')}},
        // {id: 2 name: 'ImmutableX', img: ImxIcon, click: () => {handleSelectedBlockchain('Immutable')}}
        {id: 2, name: 'Wax blockchain', img: WAXIcon, click: () => {handleSelectedBlockchain('WAX')}}
    ]

    // const tokens = [
    //     {id: 1, name: 'SDM', img: SDMIcon, click: () => {handleSelectedToken('SDM')}},
    // ]

    const handleSelectedBlockchain = (blockchain) => {
        history.push(`?blockchain=${blockchain}`);
        setBlockchainSelected(blockchain)
        setExpanded(false)
    }

    // const handleSelectedToken = (token) => {
    //   setTokenSelected(token)
    //   setTokenExpanded(false)
    // }

    // const handlerCloseModal = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <div className={'blockchain-filter-wrapper'} ref={wrapperRef}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={ <ExpandMoreIcon /> }
                >
                    <img src={ blockchainSelected === 'Flow' ? FlowIcon : WAXIcon } alt="" />
                    <Typography>{blockchainSelected} blockchain</Typography>
                </AccordionSummary>
                <div className="blockchain-filter_container">
                    <h4>Blockchains:</h4>
                    <div className="blockchain-list">
                        {blockchains.map((item , index) =>
                            <div key={index} className="blockchain-item" onClick={item.click}>
                                <img src={item.img} alt=""/>
                                <p>{item.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Accordion>
            {blockchainSelected === 'WAX' &&
                <Accordion className={'token'} expanded={true} onChange={() => setTokenExpanded(!tokenExpanded)}>
                    <AccordionSummary style={{cursor: 'default'}}>
                        <img src={ blockchainSelected === 'WAX' ? SDMIcon : SDMIcon } alt="" />
                        <Typography>{tokenSelected}</Typography>
                    </AccordionSummary>
                    {/*<div className="token-filter_container">*/}
                    {/*    <h4>Token:</h4>*/}
                    {/*    <div className="token-list">*/}
                    {/*        {tokens.map((item) =>*/}
                    {/*            <div className="token-item" onClick={item.click}>*/}
                    {/*                <img src={item.img} alt=""/>*/}
                    {/*                <p>{item.name}</p>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Accordion>
            }
        </div>
    );
}

export default BlockchainFilter