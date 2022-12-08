import { getTransactionsByAddress } from '../getTransactionsByTS'
import { cashBackParams } from './sendCashback'

async function getSubscribeContractsByTxs(params: cashBackParams) {
    const transactions = await getTransactionsByAddress(params);

    let subscribeContracts: string[] = [];

    for (let i = 0; i < transactions.length; i++) {
        let msg = transactions[i].in_msg;
        if (msg.source && msg.value > 900000000 && msg.value < 1000000000) {
            subscribeContracts.push(msg.source);
        }
    }
    return subscribeContracts;
}

export async function getSubscribersBySubscribeContracts(params: cashBackParams) {
    const subscribeContracts = await getSubscribeContractsByTxs(params);
    let subscribers: string[] = [];

    for (let i = 0; i < subscribeContracts.length; i++) {
        let subscribeContractTxs = await getTransactionsByAddress(params);
        subscribers.push(subscribeContractTxs[0].in_msg.source);
    }

    return subscribers;
}




// EQDB6CaXHpu9OIhLl2HR1bc4WvLpjoVYyPGIs36C0zKy0hIb
// EQAQruEEC_LHIGGJBU3E-vdHF2ATPrqDeqvp2I6qxeXw6nAg
// EQCUJ1UZ1QZ4wtVoWuoD1p7OEpmcI4LqvNoYNVgcE82UU8po
// EQCLjZ8zreSowTrNh-gesTjKapkCaBdV9LqoNyeqkqLdMkcG
// EQAJL3qAierYvFiA1bF-HaYeZT80ZfW4F-YAvVIsAs7MsVAZ
// EQBkBixElAaACoE6CyxnK-_liVQwugt9KDHqXrgWNrcWHEbi
// EQCzMv5ZPc3cWgMaYVpVrfHa3z6hMz0LhUjmTTZBIOsvXWWS
// EQBCNkgWGRbE8mCCdkeVUu2lpU0LU3KVVEzWoTpPVMX0yd5X
// EQCj3RydI8LpBDgZrG2DS2PS4tJWnrDvE-GF4IKhaXYi2nCO
// EQC9rDJm5R0ChQRwUn5aXgQs_szICjdzG8ScfoCT3tMMafsh
// EQAmHKu1oVfHzU_dJSFJWi0H_LxKQTjMiL-oXGWoo7X9hLuT
// EQDhx_-YSIvV0ffk1lzIQfdmDNufJrf8l8qOo9sSrmVBzLdT
// EQAuDF_fqF-Hu7sZIZZ9x9LrSMTPeEEjJetNUSXLWmjjVVni