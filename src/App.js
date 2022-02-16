import React, { useEffect }  from "react";
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

import {
    HIDE_SUCCESS_PURCHASE_POPUP,
    HIDE_TERMS_AND_CONDITION_POPUP,
    OPEN_TERMS_AND_CONDITION_POPUP,
    CONFIRMED_TERMS_AND_CONDITIONS
} from "./constants";

function App() {
  const dispatch = useDispatch();
  const { openSuccessPurchasePopup, openTermsAndConditionModal } = useSelector(({ modal }) => modal);

  useEffect(() => {
      const checkConfirmed = () => {
          const confirmedTermsAndConditions = localStorage.getItem(CONFIRMED_TERMS_AND_CONDITIONS);

          if (!confirmedTermsAndConditions || confirmedTermsAndConditions !== CONFIRMED_TERMS_AND_CONDITIONS)
              dispatch({ type: OPEN_TERMS_AND_CONDITION_POPUP });
      };

      checkConfirmed();
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />

      <Switch>
          <Route path={'/'} component={Home} exact />
          <Route path={'/market'} component={Market} exact />
          <Route path={'/market/:id'} component={ListedItem} />
          <Route path={'/purchase/:id'} component={LastPurchaseItem} />
          <Route path={'/profile/:address'} component={Profile} exact />
          {/*<Route path={'/settings'} component={ProfileSettings} exact />*/}
          {/*<Route path={'/drop/:id'} component={Drop} exact />*/}
          {/*<Route path={'/create-collectible'} component={CreateCollectible} exact />*/}
          <Redirect to={'/'} />
      </Switch>

      <Footer />

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
    </div>
  );
}

export default App;
