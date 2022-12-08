import { sendTransferHighLoad } from '../highloadTransfer';
import { getSubscribersBySubscribeContracts } from './getSubscribersByTxs';

export type cashBackParams = {
    contractAddress: string,
    amountInTON: number,
    start_ts: number,
    end_ts: number,
    limit: number,
    comment: string,
}


async function sendCashback(params: cashBackParams) {
    const subscribers: string[] = await getSubscribersBySubscribeContracts(params);
    console.log(subscribers.length)
    const transfer = await sendTransferHighLoad(subscribers, params.amountInTON, params.comment)
}

async function main(params: cashBackParams) {
    await sendCashback(params)
}

// main({
//     contractAddress: 'EQA01nlpdOOUc-QPa9OGQxQMAeVUmt152H2QxYP6CpjmTOPT',
//     amountInTON: 1,
//     start_ts: 1667311200,
//     end_ts: 1669838399,
//     limit: 999,
//     comment: 'TON CAPS November CashBack'
// })

//1667311200 1669838399 November
