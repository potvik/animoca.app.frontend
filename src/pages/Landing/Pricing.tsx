import * as React from 'react';
import { Box } from 'grommet';
import { Title, Text, Button } from 'components/Base';
import * as styles from './pricing-styles.styl';
import cn from 'classnames';
import {
  Form,
  Input,
  isRequired,
  MobxForm,
  NumberInput,
} from 'components/Form';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { formatWithTwoDecimals, moreThanZero } from 'utils';
import { IStores } from '../../stores';
import { BuyLootBoxModal } from '../PlayersMarketplace/BuyLootBoxModal';
import { SignIn } from '../../components/SignIn';

export const BoxItem = (props: {
  id: string;
  selected: boolean;
  onClick: () => void;
  total: number;
  allow: number;
}) => {
  return (
    <Box
      pad="medium"
      className={cn(styles.boxItem, props.selected ? styles.selected : '')}
      onClick={() => props.onClick()}
    >
      <img src={`/landing/pricing/${props.id}.png`} />
      <div className={styles.numbers}>
        <Text color="white">
          {props.allow}/{props.total}
        </Text>
      </div>
    </Box>
  );
};

const DataItem = (props: { text: any; label: string }) => {
  return (
    <Box direction="row" justify="between" gap="10px">
      <Box direction="row" justify="start" align="center" gap="5px">
        <Text size="medium" color="white">
          {props.label}
        </Text>
      </Box>
      <Text color="white" size="medium" bold={true}>
        {props.text}
      </Text>
    </Box>
  );
};

const DataItemLarge = (props: { text: any; label: string }) => {
  return (
    <Box direction="row" justify="between" gap="10px">
      <Box direction="row" justify="start" align="center" gap="5px">
        <Title color="white">{props.label}</Title>
      </Box>
      <Title color="white" bold={true}>
        {props.text}
      </Title>
    </Box>
  );
};

@inject('user', 'actionModals', 'buyPlayer', 'soccerPlayers')
@observer
export class Pricing extends React.Component<IStores> {
  formRef: MobxForm;

  @observable boxId = '1';

  @observable formData = {
    address: '',
    playerId: '',
    boxId: '1',
    platform: 'ios',
    amount: 0,
  };

  boxes = [
    { id: '1', total: 60, allow: 20, price: 100 },
    { id: '2', total: 60, allow: 20, price: 200 },
    { id: '3', total: 25, allow: 5, price: 300 },
    { id: '4', total: 5, allow: 5, price: 400 },
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

  buyHandler = async () => {
    const { user, actionModals, buyPlayer, soccerPlayers } = this.props;

    this.formRef.validateFields().then(async data => {
      if (!user.isAuthorized) {
        await actionModals.open(SignIn, {
          title: 'Sign in',
          applyText: 'Sign in',
          closeText: 'Cancel',
          noValidation: true,
          width: '500px',
          showOther: true,
          onApply: (data: any) => user.signIn(data.email),
        });
      }
      await buyPlayer.initPlayer(soccerPlayers.list[0].player);

      actionModals.open(() => <BuyLootBoxModal />, {
        title: '',
        applyText: 'Buy Loot Box',
        closeText: 'Cancel',
        noValidation: true,
        width: '1000px',
        showOther: true,
        onApply: () => buyPlayer.buy(),
        onClose: () => buyPlayer.clear(),
      });
    });
  };

  render() {
    return (
      <Box className={styles.pricingBody}>
        <Box
          direction="column"
          width="70%"
          gap="20px"
          style={{ background: '#0D1C2B', borderRadius: 12 }}
          pad="xlarge"
        >
          <Title color="white">Legendary Chest </Title>
          <Text color="white">
            A Legendary Chest contains one common card, 2400 gems, 730 vip
            points and 5 REVV. The card is a collectible and can only be used
            through NFTs trading platform.
          </Text>
          <Box direction="row">
            <Box direction="column">
              {this.boxes.map(box => (
                <BoxItem
                  key={box.id}
                  {...box}
                  selected={box.id === this.boxId}
                  onClick={() => (this.boxId = box.id)}
                />
              ))}
            </Box>
            <Box justify="center" align="center" margin={{ left: '50px' }}>
              <img
                style={{ maxWidth: 500 }}
                src={`/landing/pricing/preview.png`}
              />
            </Box>
          </Box>
        </Box>
        <Box direction="column" width="40%" justify="center">
          <Form
            ref={ref => (this.formRef = ref)}
            data={this.formData}
            {...({} as any)}
          >
            <Box
              direction="column"
              justify="between"
              align="center"
              className={styles.formStyles}
            >
              <Input
                name="address"
                label="Wallet Address"
                style={{ width: '361px' }}
                placeholder="address"
                rules={[isRequired]}
              />
              <Box
                direction="column"
                justify="start"
                align="start"
                style={{ width: '361px' }}
                margin={{ top: 'small', bottom: 'medium' }}
              >
                <Text>Platform</Text>
                <Box direction="row">
                  <Box
                    className={cn(
                      styles.platformButton,
                      this.formData.platform === 'ios' ? styles.selected : '',
                    )}
                    onClick={() => (this.formData.platform = 'ios')}
                  >
                    IOS
                  </Box>
                  <Box
                    className={cn(
                      styles.platformButton,
                      this.formData.platform === 'android'
                        ? styles.selected
                        : '',
                    )}
                    onClick={() => (this.formData.platform = 'android')}
                  >
                    Android
                  </Box>
                </Box>
              </Box>
              <Input
                name="playerId"
                label="Player ID"
                style={{ width: '361px' }}
                placeholder="player id"
                rules={[isRequired]}
              />
              <NumberInput
                name="amount"
                label="Amount"
                style={{ width: '361px' }}
                placeholder="0"
                rules={[isRequired, moreThanZero]}
              />
              <Box direction="column" gap="30px" margin={{ top: '10px' }}>
                <Box direction="column" gap="10px">
                  <DataItem
                    label="Lootbox type:"
                    text={`${this.selectedBox.id}`}
                  />
                  <DataItem
                    label="Price:"
                    text={`${this.selectedBox.price} ONEs`}
                  />
                  <Box margin={{ top: 'small' }}>
                    <DataItemLarge
                      label="Total:"
                      text={`${formatWithTwoDecimals(this.total)} ONEs`}
                    />
                  </Box>
                </Box>
                <Box style={{ width: '361px' }}>
                  <Button size="xlarge" onClick={() => this.buyHandler()}>
                    Buy now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }
}
