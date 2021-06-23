import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navigation from "./components/Navigation/Navigation";
import MarketContainer from "./containers/MarketContainer/MarketContainer";
import Footer from "./components/Footer/Footer";
import ProfileContainer from "./containers/ProfileContainer/ProfileContainer";
import ListedItemContainer from "./containers/ListedItemContainer/ListedItemContainer";
// import ProfileSettingsContainer from "./containers/ProfileSettingsContainer/ProfileSettingsContainer";
// import DropContainer from "./containers/DropContainer/DropContainer";
// import CreateCollectible from "./containers/CreateCollectible/CreateCollectible";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import LastPurchaseItem from "./containers/LastPurchaseItem/LastPurchaseItem";

import PurchaseCongratulationModal from "./modals/PurchaseCongratulationModal/PurchaseCongratulationModal";

import { HIDE_SUCCESS_PURCHASE_POPUP } from "./constants";

function App() {
  const dispatch = useDispatch();
  const { openSuccessPurchasePopup } = useSelector(({ modal }) => modal);

  return (
    <div className="App">
      <Navigation />

      <Switch>
          <Route path={'/'} component={HomeContainer} exact />
          <Route path={'/market'} component={MarketContainer} exact />
          <Route path={'/market/:id'} component={ListedItemContainer} />
          <Route path={'/purchase/:id'} component={LastPurchaseItem} />
          <Route path={'/profile/:address'} component={ProfileContainer} exact />
          {/*<Route path={'/settings'} component={ProfileSettingsContainer} exact />*/}
          {/*<Route path={'/drop/:id'} component={DropContainer} exact />*/}
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
    </div>
  );
}

export default App;
