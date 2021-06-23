import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import {
    NON_FUNGIBLE_TOKEN_ADDRESS,
    DARKCOUNTRY_ADDRESS
} from "../../constants";

const CODE = fcl.cdc`
    import NonFungibleToken from ${NON_FUNGIBLE_TOKEN_ADDRESS} 
    import DarkCountry from ${DARKCOUNTRY_ADDRESS} 
    
    // This script returns an array of all the NFT IDs in an account's collection.
    
    pub fun main(address: Address): [UInt64] {
        let account = getAccount(address)
    
        let collectionRef = account.getCapability(DarkCountry.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
    
        return collectionRef.getIDs()
    }
`

export async function readCollectionIds({ address }) {
    return await fcl
        .send([
            fcl.script(CODE),
            fcl.args([
                fcl.arg(address, t.Address),
            ]),
        ])
        .then(fcl.decode)
}
