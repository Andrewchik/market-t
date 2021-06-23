import * as fcl from "@onflow/fcl";

export async function tx(mods = []) {
    const txId = await fcl.send(mods).then(fcl.decode)
    console.info(
        `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
        "color:purple;font-weight:bold;font-family:monospace;"
    )

    const txStatus = await fcl.tx(txId).onceSealed()

    console.info(
        `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
        "color:green;font-weight:bold;font-family:monospace;"
    )

    return txStatus
}

function fvsTx(env, txId) {
    return `https://flow-view-source.com/${env}/tx/${txId}`
}
