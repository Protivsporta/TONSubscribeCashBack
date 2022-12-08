import { BOC, Builder, Mnemonic, Address, Coins } from 'ton3-core';
import { Wallets } from 'ton3-contracts';
import { ProviderRESTV2 } from 'ton3-providers';

const provider = new ProviderRESTV2('https://toncenter.com/api/v2', {apiKey: '41024ba3a6c66ef288d64dd570849e4a9b68fe9e21a69aa52e23cc20d6a1f12d'})

const mnemonic = new Mnemonic();

console.log(mnemonic.words);

const wallet = new Wallets.ContractHighloadWalletV2({
    workchain: 0,
    publicKey: mnemonic.keys.public,
})

async function deployHighloadWallet() {

    const client = await provider.client();

    const deploy = wallet.createDeployMessage().sign(mnemonic.keys.private);

    console.log(wallet.address.toString());

    const { data: deployData } = await client.sendBoc(null, { boc: BOC.toBase64Standard(deploy) });

    console.log(deployData);

}