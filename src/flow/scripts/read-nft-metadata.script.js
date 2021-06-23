import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import {
    NON_FUNGIBLE_TOKEN_ADDRESS,
    DARKCOUNTRY_ADDRESS
} from "../../constants";

const CODE = fcl.cdc`
    import NonFungibleToken from ${NON_FUNGIBLE_TOKEN_ADDRESS} 
    import DarkCountry from ${DARKCOUNTRY_ADDRESS} 
    
    // This script returns the metadata for an NFT in an account's collection.
    
    pub fun main(address: Address, itemID: UInt64): {String: String} {
    
        // get the public account object for the token owner
        let owner = getAccount(address)
    
        let collectionBorrow = owner.getCapability(DarkCountry.CollectionPublicPath)!
            .borrow<&{DarkCountry.DarkCountryCollectionPublic}>()
            ?? panic("Could not borrow DarkCountryCollectionPublic")
    
        // borrow a reference to a specific NFT in the collection
        let nft = collectionBorrow.borrowDarkCountryNFT(id: itemID)
            ?? panic("No such itemID in that collection")
    
        return DarkCountry.getItemTemplateMetaData(itemTemplateID: nft.itemTemplateID)!
    }
`

export async function readNftMetadata({ address, itemID }) {
    return await fcl
        .send([
            fcl.script(CODE),
            fcl.args([
                fcl.arg(address, t.Address),
                fcl.arg(itemID, t.UInt64)
            ]),
        ])
        .then(fcl.decode)
}
