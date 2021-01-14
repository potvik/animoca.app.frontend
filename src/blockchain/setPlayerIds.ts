import {
  connectToOneWallet,
  contractSale,
  contractToken,
  hmy,
  options,
} from './sdk';
const { hexToNumber, numberToHex } = require('@harmony-js/utils');

interface IParams {
  address: string;
  tokens: string[];
  playerId: string;
}

export const setPlayerID = (params: IParams): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const addrHex = hmy.crypto.getAddress(params.address).checksum;

      connectToOneWallet(contractSale.wallet, addrHex, reject);

      const recipient = addrHex;
      // const recipient = "0x0B585F8DaEfBC68a311FbD4cB20d9174aD174016";
      const tokens = params.tokens;
      const playerId = params.playerId;


      let options2 = { gasPrice: 1000000000, gasLimit: 6721900 };

      const res = await contractToken.methods
        .setTokensPlayerId(
          tokens, playerId
        )
        .send(options2);

      if (res.status !== 'called') {
        resolve({
          result: res.transaction,
          error: 'Transaction is rejected',
        });
      }

      resolve({ result: res.transaction });
    } catch (e) {
      console.error(e);

      reject(e);
    }
  });
};



export const setPlayerIDMagicWallet = (params: IParams): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const addrHex = hmy.crypto.getAddress(params.address).checksum;

      // connectToOneWallet(contractToken.wallet, params.address, reject);

      const recipient = addrHex;
      // const recipient = "0x0B585F8DaEfBC68a311FbD4cB20d9174aD174016";

      const tokens = params.tokens;
      const playerId = params.playerId;



      let tx = await contractToken.methods
        .setTokensPlayerId(
          tokens, playerId
        )

      let { txPayload } = tx.transaction;

      txPayload.from = params.address;
      txPayload.gasLimit = options.gasLimit;
      txPayload.gasPrice = '1000000000';
      // txPayload.value = numberToHex(params.amount + ONE);

      // @ts-ignore
      window.rpcProvider.sendAsync(
        {
          id: 42,
          method: 'hmy_sendTransaction',
          params: txPayload,
        },
        (err, res) => {
          console.log('state full contract call result', res);

          resolve(res);
        },
      );
    } catch (e) {
      console.error(e);

      reject(e);
    }
  });
};