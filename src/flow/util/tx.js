import * as fcl from "@onflow/fcl";

export async function tx(mods = []) {
    const txId = await fcl.send(mods).then(fcl.decode)
    console.info(
        `%cTX[${txId}]: ${fvsTx(txId)}`,
        "color:purple;font-weight:bold;font-family:monospace;"
    )

    const txStatus = await fcl.tx(txId).onceSealed()

    console.info(
        `%cTX[${txId}]: ${fvsTx(txId)}`,
        "color:green;font-weight:bold;font-family:monospace;"
    )

    return txStatus
}

function fvsTx(txId) {
    return `https://flow-view-source.com/mainnet/tx/${txId}`
}
