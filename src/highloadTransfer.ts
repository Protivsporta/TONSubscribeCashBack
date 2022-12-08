import { BOC, Builder, Mnemonic, Address, Coins } from 'ton3-core';
import { Wallets } from 'ton3-contracts';
import { ProviderRESTV2 } from 'ton3-providers';
import * as dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const provider = new ProviderRESTV2('https://toncenter.com/api/v2', {apiKey: '41024ba3a6c66ef288d64dd570849e4a9b68fe9e21a69aa52e23cc20d6a1f12d'})

//const testAddresses: string[] = ['EQCOYb24sb_BJUJZswiuausp7pNCxpiBxGL2gsjW44_Pwvn6', 'EQCze5HvnMx-9DG8QGzV-zyB4LMGTD0Xg9TKafrDHm2kH_wC', 'EQCOYb24sb_BJUJZswiuausp7pNCxpiBxGL2gsjW44_Pwvn6'];

const words: string[] = process.env.MNEMONIC!.split(' '); 

const mnemonic = new Mnemonic(words);

const wallet = new Wallets.ContractHighloadWalletV2({
    workchain: 0,
    publicKey: mnemonic.keys.public,
})

export async function sendTransferHighLoad(addresses: string[], amount: number, comment: string) {

    const client = await provider.client();

    const payments = await createPaymentListFromAddressesArray(addresses, amount, comment);

    const paymentMessage = wallet.createTransferMessage(payments).sign(mnemonic.keys.private)

    const { data: paymentsData } = await client.sendBoc(null, { boc: BOC.toBase64Standard(paymentMessage) });

    console.log(paymentsData);

}

async function createPaymentListFromAddressesArray(addresses: string[], amount: number, comment: string) {
    let paymentList = [];
    for (let i = 0; i < addresses.length; i++) {
        let payment = {
            destination: new Address(addresses[i]),
            amount: new Coins(amount),
            body: new Builder().storeUint(0, 32).storeString(comment).cell(),
            mode: 3
        };
        paymentList.push(payment);
    }
    return paymentList;
}

//sendTransferHighLoad(testAddresses, 0.01, "Test HighLoad cashback")


// async function sendManyTransfersHighloadWallet(count: number) {
//     let i = 0, howManyTimes = count;
//     async function loopHighloadTransfer() {
//         console.log(i);
//         sendTransferHighLoad();
//         i++
//         if (i < howManyTimes) {
//             setTimeout(loopHighloadTransfer, 6000)
//         }
//     }
//     loopHighloadTransfer()
// }