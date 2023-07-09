import {getDataFromAtomicApi} from "../helpers/AtomicAPI.helper";
import {ATOMIC_ASSETS_API, EOSIO, NEWMARKETNEW_CONTRACT} from "../constants";
import {fetchRows, signTransactions} from "../helpers";
import axios from "axios";

export const getDCschemas = async () => {
    return await getDataFromAtomicApi(`schemas?collection_name=darkcountryh`);
};

export const getSalesTableData = async () => {
    const { rows } = await fetchRows({
        contract: NEWMARKETNEW_CONTRACT,
        scope: NEWMARKETNEW_CONTRACT,
        table: 'sales',
        limit: 1000,
    });

    return rows;
};

export const getSales = async () => {
    const { rows } = await fetchRows({
        contract: NEWMARKETNEW_CONTRACT,
        scope: NEWMARKETNEW_CONTRACT,
        table: 'sales',
        limit: 10000,
    });

    const assetIds = rows.map(row => row.asset_ids).flat();

    const batchSize = 100;
    const assetResponsesMap = {};

    // Розділити assetIds на пакети
    const assetIdBatches = [];
    for (let i = 0; i < assetIds.length; i += batchSize) {
        assetIdBatches.push(assetIds.slice(i, i + batchSize));
    }


    for (const batch of assetIdBatches) {
        const assetResponses = await getDataFromAtomicApi(`assets?ids=${batch.join(',')}`);
        assetResponses.forEach(response => {
            const asset_id = response.asset_id;
            if (!assetResponsesMap.hasOwnProperty(asset_id)) {
                assetResponsesMap[asset_id] = [];
            }
            assetResponsesMap[asset_id].push(response);
        });
    }

    const salesWithAssets = rows.map(row => {
        const assetResponsesForIds = row.asset_ids.reduce((accumulator, asset_id) => {
            const responses = assetResponsesMap[asset_id] || [];
            return accumulator.concat(responses);
        }, []);
        return {
            ...row,
            asset_ids: assetResponsesForIds,
        };
    }).filter(row => row.offer_id !== -1);

    return salesWithAssets;
};

export const getBuyOffers = async () => {
    const { rows } = await fetchRows({
        contract: NEWMARKETNEW_CONTRACT,
        scope: NEWMARKETNEW_CONTRACT,
        table: 'buyoffers',
        limit: 10000,
    });

    const assetIds = rows.map(row => row.asset_ids).flat();

    const batchSize = 100;
    const assetResponsesMap = {};

    // Розділити assetIds на пакети
    const assetIdBatches = [];
    for (let i = 0; i < assetIds.length; i += batchSize) {
        assetIdBatches.push(assetIds.slice(i, i + batchSize));
    }


    for (const batch of assetIdBatches) {
        const assetResponses = await getDataFromAtomicApi(`assets?ids=${batch.join(',')}`);
        assetResponses.forEach(response => {
            const asset_id = response.asset_id;
            if (!assetResponsesMap.hasOwnProperty(asset_id)) {
                assetResponsesMap[asset_id] = [];
            }
            assetResponsesMap[asset_id].push(response);
        });
    }

    const buyOffersWithAssets = rows.map(row => {
        const assetResponsesForIds = row.asset_ids.reduce((accumulator, asset_id) => {
            const responses = assetResponsesMap[asset_id] || [];
            return accumulator.concat(responses);
        }, []);
        return {
            ...row,
            asset_ids: assetResponsesForIds,
        };
    })

    return buyOffersWithAssets;
};

export const buyItem = async ({
    activeUser,
    item: {
        sale_id,
        asset_ids,
        listing_price,
        settlement_symbol
    }
}) => {

    const actions = [
        {
            account: NEWMARKETNEW_CONTRACT,
            action: 'assertsale',
            data: {
                sale_id: sale_id,
                asset_ids_to_assert: asset_ids,
                listing_price_to_assert: listing_price,
                settlement_symbol_to_assert: settlement_symbol,
            }
        },
        {
            account: 'darkcountryn',
            action: 'transfer',
            data: {
                from: activeUser.accountName,
                to: NEWMARKETNEW_CONTRACT,
                quantity: listing_price,
                memo: 'deposit',
            }
        },
        {
            account: NEWMARKETNEW_CONTRACT,
            action: 'purchasesale',
            data: {
                buyer: activeUser.accountName,
                sale_id: sale_id,
                intended_delphi_median: 0,
                taker_marketplace: '',
            }
        }
    ]
    return await signTransactions({
        activeUser,
        actions
    });
};


export const getConfig = async () => {
    const { rows } = await fetchRows({
        contract: NEWMARKETNEW_CONTRACT,
        scope: NEWMARKETNEW_CONTRACT,
        table: 'config',
        limit: 100,
    });

    return rows[0];
};

export const sellItem = async ({
                                  activeUser,
                                   asset_ids,
                                   listing_price,
                              }) => {
    const actions = [
        {
            account: NEWMARKETNEW_CONTRACT,
            action: 'announcesale',
            data: {
                seller: activeUser.accountName,
                asset_ids: [asset_ids],
                listing_price: `${Number(listing_price).toFixed(4)} SDM`,
                settlement_symbol: '4,SDM',
                maker_marketplace: ''
            }
        },
        {
            account: 'atomicassets',
            action: 'createoffer',
            data: {
                sender: activeUser.accountName,
                recipient: NEWMARKETNEW_CONTRACT,
                sender_asset_ids: [asset_ids],
                recipient_asset_ids: [],
                memo: 'sale',
            }
        },
    ]
    return await signTransactions({
        activeUser,
        actions
    });
};

export const transferWaxItem = async ({ activeUser, recipientAddress, asset_id }) => {

    const actions = [
        {
            account: 'atomicassets',
            action: 'transfer',
            data: {
                from: activeUser.accountName,
                to: recipientAddress,
                asset_ids: [asset_id],
                memo: '',
            }
        },
    ]
    return await signTransactions({
        activeUser,
        actions
    });
};


export const transferRAM = async ({ activeUser, amount }) => {


    const actions = [
        {
            account: EOSIO,
            action: 'buyram',
            data: {
                payer: activeUser.accountName,
                receiver: activeUser.accountName,
                quant: Number(amount).toFixed(8) + ' WAX',
            }
        },
    ]
    return await signTransactions({
        activeUser,
        actions
    });
};

export const transferCPU = async ({ activeUser, amount, amountCPU }) => {


    const actions = [
        {
            account: EOSIO,
            action: 'delegatebw',
            data: {
                from: activeUser.accountName,
                receiver: activeUser.accountName,
                stake_cpu_quantity: Number(amount).toFixed(8) + ' WAX',
                stake_net_quantity: Number(amountCPU).toFixed(8) + ' WAX',
                transfer: ''
            }
        },
    ]
    return await signTransactions({
        activeUser,
        actions
    });
};

export const cancelSale = async ({ activeUser, sale_id }) => {

    const actions = [
        {
            account: NEWMARKETNEW_CONTRACT,
            action: 'cancelsale',
            data: {
                sale_id: sale_id,
            }
        },
    ]
    return await signTransactions({
        activeUser,
        actions
    });
};

export const getMyItems = async ({activeUser}) => {
    if (activeUser){
        const { data } = await axios.get(`${ATOMIC_ASSETS_API}/assets?owner=${activeUser.accountName}&collection_name=darkcountryh`)
        return data.data
    }
}
