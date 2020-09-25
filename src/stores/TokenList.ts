import {action, autorun, computed, observable} from 'mobx';
import {IStores} from 'stores';
import {statusFetching} from '../constants';
import {StoreConstructor} from './core/StoreConstructor';
import * as blockchain from '../blockchain';
import {WALLET_TYPE} from './UserStore';

const score = {
  'Common': 1,
  'Rare': 2,
  'Epic': 4,
  'Legendary': 20,
};

export interface ITokenCard {
  id: string;
  name: string;
  description: string;
  image: string;
  youtube_url: string;
  collection_id: string;
  collection_url: string;
  external_url: string;
  license: string;
  core: any;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

const sortByRarity = (a, b) => {
  return score[b.core.rarity.value] - score[a.core.rarity.value];
};

export class TokenList extends StoreConstructor {
  @observable public list: Array<ITokenCard> = [];
  @observable public status: statusFetching = 'init';
  @observable public actionStatus: statusFetching = 'init';
  @observable public error: string = '';
  @observable public txId: string = '';

  constructor(stores: IStores) {
    super(stores);

    autorun(() => {
      if (this.stores.user.address) {
        this.formData.address = this.stores.user.address;
      }
    });
  }

  @observable boxId = '3';

  defaultDormData = {
    address: '',
    playerId: '',
    boxId: '3',
    platform: 'ios',
    amount: 1,
  };

  @observable formData = this.defaultDormData;

  boxes = [
    {id: '3', total: 60, allow: 20, price: 100},
    // { id: '2', total: 60, allow: 20, price: 200 },
    // { id: '3', total: 25, allow: 5, price: 300 },
    // { id: '4', total: 5, allow: 5, price: 400 },
  ];

  @computed
  get selectedBox() {
    return this.boxes.find(box => box.id === this.boxId);
  }

  @computed
  get total() {
    if (this.formData.amount) {
      return this.selectedBox.price * this.formData.amount;
    } else {
      return 0;
    }
  }

  @computed
  get totalByRarity() {
    return Object.keys(score).reduce((o, rarity) => {
      o[rarity] = this.list.filter(e => e.core.rarity.value === rarity).length;
      return o;
    }, {});
  }

  @computed
  get totalSets() {
    const points = this.list.reduce((sum, e) => {
      return sum + score[e.core.rarity.value];
    }, 0);

    return ~~(points / 20);
  }

  @computed
  get filteredList() {
    return this.list;
  }

  @observable newCardsList: Array<ITokenCard> = [];
  @observable hasNewCards = false;

  @action.bound
  clearNewCards = () => {
    this.hasNewCards = false;
    this.newCardsList = [];
  };

  @action.bound
  getList = async () => {
    if (!this.stores.user.isAuthorized) {
      return;
    }

    if (this.status === 'first_fetching') {
      return
    }

    if (this.status === 'init') {
      this.status = 'first_fetching';
    } else {
      this.status = 'fetching';
    }

    try {
      const res = await blockchain.getTokens(this.stores.user.address);

      let list = res.filter(r => !!r);

      // list = list.concat(list, list, list, list, list, list, list, list, list, list, list, list)

      if (this.status !== 'first_fetching' && list.length > this.list.length) {
        const diffCount = list.length - this.list.length;

        this.newCardsList = list.slice(list.length - diffCount, list.length);

        this.hasNewCards = true;
      }

      this.list = list.sort(sortByRarity);

      this.status = 'success';
    } catch (e) {
      console.error(e);
      this.status = 'error';
    }
  };

  @action.bound
  async buyLootBox() {
    this.actionStatus = 'fetching';

    return new Promise(async (resolve, reject) => {
      try {
        if (Number(this.stores.user.balance) < Number(this.total) * 1e18) {
          throw new Error('Your balance is not enough to buy');
        }

        let res;

        if (this.stores.user.walletType === WALLET_TYPE.MAGIC_WALLET) {
          res = await blockchain.purchase({
            address: this.stores.user.address,
            quantity: this.formData.amount,
            amount: String(this.total),
            playerId: this.formData.playerId,
          });
        }

        if (this.stores.user.walletType === WALLET_TYPE.ONE_WALLET) {
          res = await blockchain.purchaseOneWallet({
            address: this.stores.user.address,
            quantity: this.formData.amount,
            amount: String(this.total),
            playerId: this.formData.playerId,
          });
        }

        this.txId = res.result.transactionHash || res.result.id;

        if (!res.error) {
          this.actionStatus = 'success';

          setTimeout(async () => {
            await this.getList();

            resolve();
          }, 2000);

          return;
        }

        this.error = res.error;

        this.actionStatus = 'error';
        reject(res.error);
      } catch (e) {
        console.error(e);
        this.error = e.message;

        this.actionStatus = 'error';

        reject(e.message);
      }
    });
  }

  @action.bound
  clear() {
    this.actionStatus = 'init';
    this.formData = this.defaultDormData;
  }
}
