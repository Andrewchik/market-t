import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { tx } from "../util/tx";

import {
    DARKCOUNTRY_ADDRESS,
    NON_FUNGIBLE_TOKEN_ADDRESS
} from "../../constants";

const CODE = fcl.cdc`
    import NonFungibleToken from ${ NON_FUNGIBLE_TOKEN_ADDRESS } 
    import DarkCountry from ${ DARKCOUNTRY_ADDRESS } 
    
    // This transaction transfers a NFT from one account to another.

    transaction(recipient: Address, withdrawID: UInt64) {
        prepare(signer: AuthAccount) {
    
            // get the recipients public account object
            let recipient = getAccount(recipient)
    
            // borrow a reference to the signer's NFT collection
            let collectionRef = signer.borrow<&DarkCountry.Collection>(from: DarkCountry.CollectionStoragePath)
                ?? panic("Could not borrow a reference to the owner's collection")
    
            // borrow a public reference to the receivers collection
            let depositRef = recipient.getCapability(DarkCountry.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()!
    
            // withdraw the NFT from the owner's collection
            let nft <- collectionRef.withdraw(withdrawID: withdrawID)
    
            // Deposit the NFT in the recipient's collection
            depositRef.deposit(token: <-nft)
        }
    }
`;

export function transferItem({ recipient, withdrawID }) {
    return tx(
        [
            fcl.transaction(CODE),
            fcl.args([
                fcl.arg(recipient, t.Address),
                fcl.arg(Number(withdrawID), t.UInt64),
            ]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(1000),
        ]
    )
}
