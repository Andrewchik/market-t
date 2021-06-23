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
    
    transaction(saleItemID: UInt64, marketCollectionAddress: Address) {
        let paymentVault: @FungibleToken.Vault
        let darkCountryCollection: &DarkCountry.Collection{NonFungibleToken.Receiver}
        let marketCollection: &DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}
    
        prepare(signer: AuthAccount) {
        
            // if the account doesn't already have a collection
            if signer.borrow<&DarkCountry.Collection>(from: DarkCountry.CollectionStoragePath) == nil {
    
                // create a new empty collection
                let collection <- DarkCountry.createEmptyCollection()
    
                // save it to the account
                signer.save(<-collection, to: DarkCountry.CollectionStoragePath)
    
                // create a public capability for the collection
                signer.link<&DarkCountry.Collection{NonFungibleToken.CollectionPublic, DarkCountry.DarkCountryCollectionPublic}>(DarkCountry.CollectionPublicPath, target: DarkCountry.CollectionStoragePath)
            }
            
            // if the account doesn't already have a collection
            if signer.borrow<&DarkCountryMarket.Collection>(from: DarkCountryMarket.CollectionStoragePath) == nil {
    
                // create a new empty collection
                let collection <- DarkCountryMarket.createEmptyCollection() as! @DarkCountryMarket.Collection
    
                // save it to the account
                signer.save(<-collection, to: DarkCountryMarket.CollectionStoragePath)
    
                // create a public capability for the collection
                signer.link<&DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}>(DarkCountryMarket.CollectionPublicPath, target: DarkCountryMarket.CollectionStoragePath)
            }
            
            self.marketCollection = getAccount(marketCollectionAddress)
                .getCapability<&DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}>(
                    DarkCountryMarket.CollectionPublicPath
                )!
                .borrow()
                ?? panic("Could not borrow market collection from market address")

            let saleItem = self.marketCollection.borrowSaleItem(itemID: saleItemID)
                ?? panic("No item with that ID")
            let price = saleItem.price
                
            let mainFlowTokenVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                ?? panic("Cannot borrow FlowToken vault from acct storage")
            
            self.paymentVault <- mainFlowTokenVault.withdraw(amount: price)
    
            self.darkCountryCollection = signer.borrow<&DarkCountry.Collection{NonFungibleToken.Receiver}>(
                from: DarkCountry.CollectionStoragePath
            ) ?? panic("Cannot borrow DarkCountry collection receiver from acct")
        }
    
        execute {
            self.marketCollection.purchase(
                itemID: saleItemID,
                buyerCollection: self.darkCountryCollection,
                buyerPayment: <- self.paymentVault
            )
        }
    }
`;

export function buyMarketItem({ saleItemID, marketCollectionAddress }) {
    console.log({ saleItemID });

    return tx(
        [
            fcl.transaction(CODE),
            fcl.args([
                fcl.arg(Number(saleItemID), t.UInt64),
                fcl.arg(String(marketCollectionAddress), t.Address),
            ]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(1000),
        ]
    )
}
