const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const { hexToNumber } = require('@harmony-js/utils');

const isMainnet = !!(+process.env.MAINNET)

//@ts-ignore
//window.env = process.env
export const EXPLORER_URL = !isMainnet
  ? 'https://explorer.testnet.harmony.one/#'
  : "https://explorer.harmony.one/#"

export const RPC_URL = !isMainnet
  ? 'https://api.s0.b.hmny.io'
  : "https://api.s0.t.hmny.io"

const GAS_LIMIT = 103802;
const GAS_PRICE = 1000000000;

export const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  RPC_URL,
  {
    chainType: ChainType.Harmony,
    chainId: !isMainnet ? ChainID.HmyTestnet : ChainID.HmyMainnet,
  },
);



export const contractJsonSale = require('./contracts/BQSale.json');
export const contractSale = hmy.contracts.createContract(
  contractJsonSale.abi,
  isMainnet ? process.env.SALE : process.env.TESTNET_SALE,
);

contractSale.wallet.createAccount();


const contractAddrToken = isMainnet ? process.env.TOKEN : process.env.TESTNET_TOKEN;
const contractJsonToken = require('./contracts/BeastQuest.json');
export const contractToken = hmy.contracts.createContract(
  contractJsonToken.abi,
  contractAddrToken,
);

export const options = { gasPrice: 1000000000, gasLimit: 6721900 };

export const options1 = { gasPrice: '0x3B9ACA00' };

export const options2 = { gasPrice: 1000000000, gasLimit: 21000 };

export const ONE = '000000000000000000';

export const connectToOneWallet = (wallet, address, reject) => {
  wallet.defaultSigner = address;

  wallet.signTransaction = async tx => {
    try {
      tx.from = address;

      // @ts-ignore
      const signTx = await window.onewallet.signTransaction(tx);

      return signTx;
    } catch (e) {
      reject(e);
    }

    return null;
  };
};

export const checkResponse = (res, stepNumber) => {
  if (res && res.transaction && res.transaction.txStatus === 'CONFIRMED') {
    return true;
  }

  throw new Error(`step ${stepNumber} tx - rejected`);
};

export const sendMethods = async (methods, reject, setStep) => {
  for (let i = 0; i < methods.length; i++) {
    try {
      const method = methods[i];

      setStep(i);

      const options = { gasPrice: 1000000000, gasLimit: 6721900 };

      // if (method && method.estimateGas) {
      //   const gas = await method.estimateGas(options1);
      //   options.gasLimit = hexToNumber(gas);
      // }

      const res = await method.send(options);

      checkResponse(res, i + 1);

      console.log('action confirmed', i + 1);
    } catch (e) {
      console.error(e);

      return reject(e);
    }
  }
};
