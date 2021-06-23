import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { tx } from "../util/tx";

import {
    DARKCOUNTRY_ADDRESS,
    DARKCOUNTRY_MARKET_ADDRESS,
    FUNGIBLE_TOKEN_ADDRESS,
    FLOW_TOKEN_ADDRESS,
    NON_FUNGIBLE_TOKEN_ADDRESS
} from "../../constants";

const CODE = fcl.cdc`
    import NonFungibleToken from ${ NON_FUNGIBLE_TOKEN_ADDRESS } 
    import DarkCountry from ${ DARKCOUNTRY_ADDRESS } 
    import DarkCountryMarket from ${ DARKCOUNTRY_MARKET_ADDRESS } 
    import FungibleToken from ${ FUNGIBLE_TOKEN_ADDRESS } 
    import FlowToken from ${ FLOW_TOKEN_ADDRESS } 
    
    transaction(saleItemID: UInt64, saleItemPrice: UFix64) {
        let flowVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
        let darkCountryCollection: Capability<&DarkCountry.Collection{NonFungibleToken.Provider}>
        let marketCollection: &DarkCountryMarket.Collection
    
        prepare(signer: AuthAccount) {
            // we need a provider capability, but one is not provided by default so we create one.
            let DarkCountryCollectionProviderPrivatePath = /private/darkCountryCollectionProvider
    
            self.flowVault = signer.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
            assert(self.flowVault.borrow() != nil, message: "Missing or mis-typed Flow receiver")
    
            if !signer.getCapability<&DarkCountry.Collection{NonFungibleToken.Provider}>(DarkCountryCollectionProviderPrivatePath)!.check() {
                signer.link<&DarkCountry.Collection{NonFungibleToken.Provider}>(DarkCountryCollectionProviderPrivatePath, target: DarkCountry.CollectionStoragePath)
            }
    
            self.darkCountryCollection = signer.getCapability<&DarkCountry.Collection{NonFungibleToken.Provider}>(DarkCountryCollectionProviderPrivatePath)!
            assert(self.darkCountryCollection.borrow() != nil, message: "Missing or mis-typed DarkCountryCollection provider")
    
            self.marketCollection = signer.borrow<&DarkCountryMarket.Collection>(from: DarkCountryMarket.CollectionStoragePath)
                ?? panic("Missing or mis-typed DarkCountryMarket Collection")
        }
    
        execute {
            let offer <- DarkCountryMarket.createSaleOffer (
                sellerItemProvider: self.darkCountryCollection,
                itemID: saleItemID,
                sellerPaymentReceiver: self.flowVault,
                price: saleItemPrice
            )
            self.marketCollection.insert(offer: <-offer)
        }
    }
`;

export function sellMarketItem({ saleItemID, saleItemPrice }) {
    console.log({ saleItemID, saleItemPrice });

    return tx(
        [
            fcl.transaction(CODE),
            fcl.args([
                fcl.arg(Number(saleItemID), t.UInt64),
                fcl.arg(parseFloat(saleItemPrice).toFixed(2), t.UFix64),
            ]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(1000),
        ]
    )
}
