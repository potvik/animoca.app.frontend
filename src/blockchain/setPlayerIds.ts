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

