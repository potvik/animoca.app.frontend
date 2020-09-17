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
import { inject, observer } from 'mobx-react';
import { formatWithTwoDecimals, moreThanZero } from 'utils';
import { IStores, useStores } from '../../stores';
import { BuyLootBoxModal } from '../PlayersMarketplace/BuyLootBoxModal';
import { SignIn } from '../../components/SignIn';
import { useMediaQuery } from 'react-responsive';

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

const Preview = () => {
  const isSmallMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const { tokenList } = useStores();

  return (
    <Box
      direction="column"
      width="400px"
      gap="20px"
      style={{ background: '#0D1C2B', borderRadius: 12, flexGrow: 1 }}
      pad={isSmallMobile ? '20px' : 'xlarge'}
      margin={{ top: isSmallMobile ? '' : 'medium', right: 'medium' }}
    >
      <Title color="white">Legendary Chest </Title>
      <Text color="white">
        Each Chest contains 2400 gems, 730 vip points and a card with rarity
        Common, Epic or Legendary. The card is a collectible and can be used to
        claim ONE rewards via staking.
      </Text>
      <Box direction="row">
        <Box direction="column" style={{ minWidth: 132 }}>
          {tokenList.boxes.map(box => (
            <BoxItem
              key={box.id}
              {...box}
              selected={box.id === tokenList.boxId}
              onClick={() => (tokenList.boxId = box.id)}
            />
          ))}
        </Box>
        {!isSmallMobile ? (
          <Box justify="center" align="center" margin={{ left: '50px' }}>
            <img
              style={{ maxWidth: '100%' }}
              src={`/landing/pricing/preview.png`}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

@inject('user', 'actionModals', 'buyPlayer', 'soccerPlayers', 'tokenList')
@observer
export class Pricing extends React.Component<IStores> {
  formRef: MobxForm;

  buyHandler = async () => {
    const { user, actionModals, tokenList } = this.props;

    if (!user.isAuthorized) {
      await actionModals.open(SignIn, {
        title: 'Sign in',
        applyText: 'Sign in',
        closeText: 'Cancel',
        noValidation: true,
        width: '500px',
        showOther: true,
        onApply: (data: any) => user.signIn(data.email, data.walletType),
      });
    }

    this.formRef.validateFields().then(async data => {
      if (!user.isAuthorized) {
        await actionModals.open(SignIn, {
          title: 'Sign in',
          applyText: 'Sign in',
          closeText: 'Cancel',
          noValidation: true,
          width: '500px',
          showOther: true,
          onApply: (data: any) => user.signIn(data.email, data.walletType),
        });
      }

      // await buyPlayer.initPlayer(soccerPlayers.list[0].player);

      actionModals.open(() => <BuyLootBoxModal />, {
        title: '',
        applyText: 'Buy Loot Box',
        closeText: 'Cancel',
        noValidation: true,
        width: '1000px',
        showOther: true,
        onApply: () => this.props.tokenList.buyLootBox(),
        onClose: () => tokenList.clear(),
      });
    });
  };

  render() {
    const { tokenList, user, actionModals } = this.props;

    return (
      <Box
        className={styles.pricingBody}
        margin={{ top: 'medium' }}
        gap="20px"
        justify="between"
        fill={true}
      >
        <Preview />

        <Box
          direction="column"
          width="400px"
          justify="center"
          style={{ background: '#0D1C2B', borderRadius: 12 }}
        >
          <Form
            ref={ref => (this.formRef = ref)}
            data={tokenList.formData}
            {...({} as any)}
          >
            <Box
              direction="column"
              justify="between"
              align="center"
              pad="20px"
              className={styles.formStyles}
            >
              <Box direction="row" align="end">
                <Input
                  name="address"
                  disabled={true}
                  label={
                    user.isAuthorized
                      ? 'Wallet Address'
                      : 'Wallet Address (sign in to get wallet address)'
                  }
                  style={{
                    width: !user.isAuthorized ? '260px' : '361px',
                    maxWidth: '100%',
                  }}
                  placeholder="address"
                  rules={[isRequired]}
                />
                {!user.isAuthorized ? (
                  <Button
                    margin={{ left: 'medium', bottom: 'small' }}
                    onClick={() => {
                      actionModals.open(SignIn, {
                        title: 'Sign in',
                        applyText: 'Sign in',
                        closeText: 'Cancel',
                        noValidation: true,
                        width: '500px',
                        showOther: true,
                        onApply: (data: any) =>
                          user.signIn(data.email, data.walletType),
                      });
                    }}
                    disabled={user.status !== 'success'}
                  >
                    Sign in
                  </Button>
                ) : null}
              </Box>
              <Box
                direction="column"
                justify="start"
                align="start"
                style={{ width: '361px' }}
                margin={{ top: 'small', bottom: 'medium' }}
              >
                <Text color="white">Platform</Text>
                <Box direction="row">
                  <Box
                    className={cn(
                      styles.platformButton,
                      tokenList.formData.platform === 'ios'
                        ? styles.selected
                        : '',
                    )}
                    onClick={() => (tokenList.formData.platform = 'ios')}
                  >
                    IOS
                  </Box>
                  <Box
                    className={cn(
                      styles.platformButton,
                      tokenList.formData.platform === 'android'
                        ? styles.selected
                        : '',
                    )}
                    onClick={() => (tokenList.formData.platform = 'android')}
                  >
                    Android
                  </Box>
                </Box>
              </Box>
              <Input
                name="playerId"
                label="Player ID"
                style={{ width: '361px', maxWidth: '100%' }}
                placeholder="player id"
                rules={[isRequired]}
              />
              <NumberInput
                name="amount"
                label="Amount"
                style={{ width: '361px', maxWidth: '100%' }}
                placeholder="0"
                rules={[isRequired, moreThanZero]}
              />
              <Box direction="column" gap="30px" margin={{ top: '10px' }}>
                <Box direction="column" gap="10px">
                  <DataItem
                    label="Lootbox type:"
                    text={`${tokenList.selectedBox.id}`}
                  />
                  <DataItem
                    label="Price:"
                    text={`${tokenList.selectedBox.price} ONEs`}
                  />
                  <Box margin={{ top: 'small' }}>
                    <DataItemLarge
                      label="Total:"
                      text={`${formatWithTwoDecimals(tokenList.total)} ONEs`}
                    />
                  </Box>
                </Box>
                <Box style={{ width: '361px', maxWidth: '100%' }}>
                  <Button
                    disabled={user.status !== 'success'}
                    size="xlarge"
                    onClick={() => {
                      this.buyHandler();
                    }}
                  >
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
