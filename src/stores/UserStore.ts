import { action, observable } from 'mobx';
import { IStores } from 'stores';
import { statusFetching } from '../constants';
import * as blockchain from '../blockchain';
import { Magic } from 'magic-sdk';
import { StoreConstructor } from './core/StoreConstructor';

// const { Harmony: Index } = require('@harmony-js/core');
const { ChainID } = require('@harmony-js/utils');

// const harmony = new Index(
//   // rpc url
//   blockchain.RPC_URL,
//   {
//     // chainType set to Index
//     chainType: ChainType.Harmony,
//     // chainType set to HmyLocal
//     chainId: ChainID.HmyTestnet,
//   },
// );

const magic = new Magic('pk_test_014A9E7A1431634F', {
  network: {
    rpcUrl: blockchain.RPC_URL,
    chainId: Number(ChainID.HmyTestnet),
    chainType: 'HARMONY',
  } as any,
});

const rpcProvider = magic.rpcProvider;

// @ts-ignore
window.rpcProvider = magic.rpcProvider;

const defaults = {};

export class UserStoreEx extends StoreConstructor {
  public stores: IStores;
  @observable public isAuthorized: boolean;
  @observable public status: statusFetching = 'init';
  redirectUrl: string;

  private mathwallet: any;
  @observable public isMathWallet = false;
  @observable public isLogged = false;

  @observable public sessionType: 'mathwallet' | 'magic';
  @observable public address: string;
  @observable public balance: string = '0';

  @observable metadata: any = {};
  @observable email = '';

  constructor(stores: IStores) {
    super(stores);

    setInterval(async () => {
      if (this.isAuthorized) {
        // this.metadata = await this.getMetaData();
        const res = await blockchain.getBalance(this.address);
        this.balance = res && res.result;
      }
    }, 3000);

    if (!this.isAuthorized) {
      magic.user
        .isLoggedIn()
        .then(async res => {
          this.isAuthorized = res;

          if (this.isAuthorized) {
            this.sessionType = `magic`;

            await this.initMetaData();

            this.stores.tokenList.getList();
          }

          return Promise.resolve();
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => (this.status = 'success'));
    }

    // // @ts-ignore
    // this.isMathWallet = window.harmony && window.harmony.isMathWallet;
    // // @ts-ignore
    // this.mathwallet = window.harmony;
    //
    // const session = localStorage.getItem('harmony_session');
    //
    // const sessionObj = JSON.parse(session);
    //
    // if (sessionObj && sessionObj.address) {
    //   this.address = sessionObj.address;
    //   this.sessionType = sessionObj.sessionType;
    //   this.isAuthorized = true;
    //
    //   blockchain
    //     .getBalance(this.address)
    //     .then(res => (this.balance = res && res.result));
    // }
  }

  @action.bound
  public signIn(email: string) {
    debugger;

    return magic.auth
      .loginWithMagicLink({ email, showUI: true })
      .then(async () => {
        this.sessionType = `magic`;

        this.isAuthorized = true;

        await this.initMetaData();

        this.syncLocalStorage();

        this.stores.tokenList.getList();

        return Promise.resolve();
      });
  }

  @action.bound
  initMetaData = async () => {
    this.metadata = await this.getMetaData();
    this.email = this.metadata.email;
    this.address = this.metadata.publicAddress;

    blockchain
      .getBalance(this.address)
      .then(res => (this.balance = res && res.result));
  };

  @action.bound
  public signOut() {
    if (this.sessionType === 'mathwallet' && this.isMathWallet) {
      return this.mathwallet
        .forgetIdentity()
        .then(() => {
          this.sessionType = null;
          this.address = null;
          this.isAuthorized = false;
          this.balance = '0';

          this.syncLocalStorage();

          return Promise.resolve();
        })
        .catch(err => {
          console.error(err.message);
        });
    }

    if (this.sessionType === 'magic' && this.isAuthorized) {
      return magic.user.logout().then(() => {
        this.sessionType = null;
        this.address = null;
        this.isAuthorized = false;
        this.balance = '0';

        this.syncLocalStorage();

        return Promise.resolve();
      });
    }
  }

  private syncLocalStorage() {
    localStorage.setItem(
      'harmony_session',
      JSON.stringify({
        address: this.address,
        sessionType: this.sessionType,
      }),
    );
  }

  @action public signTransaction(txn: any) {
    if (this.sessionType === 'mathwallet' && this.isMathWallet) {
      return this.mathwallet.signTransaction(txn);
    }
  }

  public saveRedirectUrl(url: string) {
    if (!this.isAuthorized && url) {
      this.redirectUrl = url;
    }
  }

  @action public reset() {
    Object.assign(this, defaults);
  }

  // Magic

  getMetaData = async () => {
    const metadata = await magic.user.getMetadata();
    console.log('Metadata:', metadata);

    return metadata;
  };

  /**
   Transfers ONE tokens

   @param {string} to address
   @param {string} from address
   @param {string|number} value The value to transfer in ONE (will be converted to BigInt)
   @param {number} [toShard] shard we're sending to
   @param {number} [fromShard] shard we're sending from

   @return {Promise<object{}>} The promise always resolves and returns the object { hash, receipt, error }
   */
  handlerSendTransaction = () => {
    rpcProvider.sendAsync(
      {
        id: 42,
        method: 'hmy_sendTransaction',
        params: {
          //  token send to
          to: 'one1fcxhn7ethldh399rpu95flemzj3tvaqmygkedg',
          // amount to send
          value: '50000',
          // gas limit, you can use string
          gasLimit: '210000',
          // send token from shardID
          shardID: 0,
          // send token to toShardID
          toShardID: 0,
          // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
          gasPrice: 1000000000,
        },
      },
      (err, res) => {
        console.log('transaction result', res);
        window.open(
          `https://explorer.testnet.harmony.one/#/tx/${res.result.transactionHash}`,
        );
      },
    );
  };
}
