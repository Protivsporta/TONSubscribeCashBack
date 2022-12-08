import axios from 'axios';
import { cashBackParams } from './sendCashBackScript/sendCashback';
import * as dotenv from 'dotenv';
dotenv.config({path:'../.env'});

export async function getTransactionsByAddress(params: cashBackParams) {
    const { data: responseData } = await axios.get(`https://toncenter.com/api/index/getTransactionsByAddress?address=${params.contractAddress}&start_utime=${params.start_ts}&end_utime=${params.end_ts}&limit=${params.limit}&offset=0&sort=desc&include_msg_body=false&api_key=${process.env.API_KEY}`);
    return responseData;
}
