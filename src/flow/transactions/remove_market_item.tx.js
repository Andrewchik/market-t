import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { tx } from "../util/tx";

import { DARKCOUNTRY_MARKET_ADDRESS } from "../../constants";

const CODE = fcl.cdc`
    import DarkCountryMarket from ${DARKCOUNTRY_MARKET_ADDRESS}
    
    transaction(itemID: UInt64) {
        let marketCollection: &DarkCountryMarket.Collection
    
        prepare(signer: AuthAccount) {
            self.marketCollection = signer.borrow<&DarkCountryMarket.Collection>(from: DarkCountryMarket.CollectionStoragePath)
                ?? panic("Missing or mis-typed DarkCountryMarket Collection")
        }
    
        execute {
            let offer <-self.marketCollection.remove(itemID: itemID)
            destroy offer
        }
    }
`;

export function removeMarketItem({ itemId }) {
    console.log({ itemId });

    return tx(
        [
            fcl.transaction(CODE),
            fcl.args([
                fcl.arg(Number(itemId), t.UInt64)
            ]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(1000),
        ]
    )
}
