import * as fcl from "@onflow/fcl";

import { tx } from "../util/tx";

import {
    DARKCOUNTRY_ADDRESS,
    DARKCOUNTRY_MARKET_ADDRESS,
    NON_FUNGIBLE_TOKEN_ADDRESS
} from "../../constants";

const CODE = fcl.cdc`
    import NonFungibleToken from ${ NON_FUNGIBLE_TOKEN_ADDRESS } 
    import DarkCountry from ${ DARKCOUNTRY_ADDRESS } 
    import DarkCountryMarket from ${ DARKCOUNTRY_MARKET_ADDRESS } 
    
    transaction {
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
            
            // It's OK if the account already has a Vault, but we don't want to replace it
            if (signer.borrow<&SdmToken.Vault>(from: /storage/sdmTokenVault) == nil) {
                // Create a new SdmToken Vault and put it in storage
                signer.save(<-SdmToken.createEmptyVault(), to: /storage/sdmTokenVault)
            
                // Create a public capability to the Vault that only exposes
                // the deposit function through the Receiver interface
                signer.link<&SdmToken.Vault{FungibleToken.Receiver}>(
                  /public/sdmTokenReceiver,
                  target: /storage/sdmTokenVault
                )
            
                // Create a public capability to the Vault that only exposes
                // the balance field through the Balance interface
                signer.link<&SdmToken.Vault{FungibleToken.Balance}>(
                  /public/sdmTokenBalance,
                  target: /storage/sdmTokenVault
                )  
            }
        }
    }
`;

export function setup() {
    return tx(
        [
            fcl.transaction(CODE),
            fcl.args([]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(1000),
        ]
    )
}
