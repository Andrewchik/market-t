import React, { useEffect, useState, useContext }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navigation from "./components/Navigation/Navigation";
import Market from "./containers/Market/Market";
import Footer from "./components/Footer/Footer";
import Profile from "./containers/Profile/Profile";
import ListedItem from "./containers/ListedItem/ListedItem";
// import ProfileSettings from "./containers/ProfileSettings/ProfileSettings";
// import Drop from "./containers/Drop/Drop";
// import CreateCollectible from "./containers/CreateCollectible/CreateCollectible";
import Home from "./containers/Home/Home";
import LastPurchaseItem from "./containers/LastPurchaseItem/LastPurchaseItem";

import PurchaseCongratulationModal from "./modals/PurchaseCongratulationModal/PurchaseCongratulationModal";
import TermsAndConditionModal from "./modals/TermsAndConditionModal/TermsAndConditionModal";
import ConnectModal from "./components/Modal/ConnectModal/ConnectModal";

import {
    HIDE_SUCCESS_PURCHASE_POPUP,
    HIDE_TERMS_AND_CONDITION_POPUP,
    OPEN_TERMS_AND_CONDITION_POPUP,
    CONFIRMED_TERMS_AND_CONDITIONS,
    HIDE_CONNECTION_WALLET_POPUP, HIDE_BALANCES_POPUP, USER_ITEMS_WAX, CONFIG
} from "./constants";
import ListedImxItem from "./containers/ListImxItem/ListedImxItem";
import BalancesModal from "./modals/Balances/BalancesModal";
import LastPurchaseIMXItem from "./containers/LastPurchaseIMXItem/LastPurchaseIMXItem";
import ListedWAXItem from "./containers/ListedWAXItem/ListedWAXItem";
import { UALContext } from "ual-reactjs-renderer";
import {getBurnStat, getConfig, getSales} from "./services/wax.service";
import { showErrorMessage } from "./helpers";

//test
function App() {
  const { activeUser } = useContext(UALContext);
  const dispatch = useDispatch();

  const { openSuccessPurchasePopup, openTermsAndConditionModal, openConnectWalletModal, openBalancesModal } = useSelector(({ modal }) => modal);
  const [loggedIn, setLoggedIn] = useState(false);
  const [metamask, setMetamask] = useState('')
  const [burnStat, setBurnStat] = useState([])

  useEffect(() => {
      const checkConfirmed = () => {
          const confirmedTermsAndConditions = localStorage.getItem(CONFIRMED_TERMS_AND_CONDITIONS);

          if (!confirmedTermsAndConditions || confirmedTermsAndConditions !== CONFIRMED_TERMS_AND_CONDITIONS)
              dispatch({ type: OPEN_TERMS_AND_CONDITION_POPUP });
      };

      checkConfirmed();
  }, [dispatch]);


  useEffect(() => {
    getSales()
        .then((data) => {
            dispatch({
                type: USER_ITEMS_WAX,
                payload: data
            });
        })
        .catch((error) => {
            showErrorMessage(error)
            console.log(error)
        })
}, [dispatch])




    useEffect(() => {
        getBurnStat()
            .then((data) => {
                setBurnStat(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

  useEffect(() => {
    if(activeUser) {
    getConfig()
        .then((data) => {
            dispatch({
                        type: CONFIG,
                        payload: data
                    });
        })
        .catch((error) => {
            showErrorMessage(error)
            console.log(error);
        })
    }
  }, [activeUser, dispatch])

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} metamask={metamask} setMetamask={setMetamask}/>

      <Switch>
          <Route path={'/'} component={Home} exact />
          <Route path={'/market'} component={Market} exact />
          <Route path={'/market?blockchain=WAX'} component={Market} exact />
          <Route path={'/market/:id'} component={ListedItem} />
          <Route path={'/imx-market/:id'} component={ListedImxItem} />
          <Route path={'/wax-market/:id'} component={ListedWAXItem} />
          <Route path={'/purchase/:id'} component={LastPurchaseItem} />
          <Route path={'/purchase-imx/:id'} component={LastPurchaseIMXItem} />
          <Route path={'/profile/:address'} component={Profile} exact />
          {/*<Route path={'/settings'} component={ProfileSettings} exact />*/}
          {/*<Route path={'/drop/:id'} component={Drop} exact />*/}
          {/*<Route path={'/create-collectible'} component={CreateCollectible} exact />*/}
          <Redirect to={'/'} />
      </Switch>

      <Footer burnStat={burnStat} />

      <ToastContainer
          position="bottom-left"
          autoClose={4000}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
      />

      <PurchaseCongratulationModal
          onClose={ () => dispatch({ type: HIDE_SUCCESS_PURCHASE_POPUP }) }
          visible={openSuccessPurchasePopup}
      />

      <TermsAndConditionModal
          handleClose={() => dispatch({ type: HIDE_TERMS_AND_CONDITION_POPUP })}
          visible={openTermsAndConditionModal}
      />

      <ConnectModal
          handleClose={() => dispatch({ type: HIDE_CONNECTION_WALLET_POPUP })}
          visible={openConnectWalletModal}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setMetamask={setMetamask}
      />

      <BalancesModal
          handleClose={() => dispatch({ type: HIDE_BALANCES_POPUP })}
          visible={openBalancesModal}
          address={metamask}
      />

    </div>
  );
}

export default App;
