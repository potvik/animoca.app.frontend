import React from 'react';
import { Box } from 'grommet';
import { Title, Text, Icon } from 'components/Base';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { PlayerCardLite } from './PlayerCardLite';
import * as styles from './card.styl';
import { EXPLORER_URL } from '../../../blockchain';
import { Spinner } from 'ui';
import { truncateAddressString } from '../../../utils';
import { PlayerCardLiteOwner } from './PlayerCardLiteOwner';

interface IBuyPlayerModalProps {}

export const BuyLootBoxModal = observer<IBuyPlayerModalProps>(props => {
  const { tokenList: buyPlayer } = useStores();

  let icon = () => <Icon style={{ width: 50 }} glyph="RightArrow" />;
  let description = 'Approval';

  switch (buyPlayer.actionStatus) {
    case 'init':
      icon = () => (
        <Icon
          style={{ height: '110px', width: 'auto' }}
          className={styles.sendArrow}
          glyph="SendArrow"
        />
      );
      description =
        'Each Chest contains 2400 gems, 730 vip points and a card with rarity Common, Epic or Legendary. The card is a collectible and can be used to claim ONE rewards via staking.';
      break;

    case 'fetching':
      icon = () => <Spinner />;
      description = 'Sending';
      break;

    case 'error':
      icon = () => <Icon size="50" style={{ width: 50 }} glyph="Alert" />;
      description = buyPlayer.error;
      break;

    case 'success':
      icon = () => <Icon size="50" style={{ width: 50 }} glyph="CheckMark" />;
      description = 'Success';
      break;
  }

  return (
    <Box
      pad={{ horizontal: 'large', top: 'large' }}
      className={styles.modalContainer}
    >
      <Title style={{ textAlign: 'center' }}>Buy Loot Box</Title>
      <Box
        margin={{ top: 'large' }}
        direction="row"
        align="center"
        justify="between"
      >
        <PlayerCardLite />

        <Box
          direction="column"
          align="center"
          justify="center"
          style={{ maxWidth: 340, marginTop: -20 }}
        >
          {icon()}
          <Box className={styles.description}>
            <Text>{description}</Text>
            {buyPlayer.txId ? (
              <a
                style={{ marginTop: 10 }}
                href={EXPLORER_URL + `/tx/${buyPlayer.txId}`}
                target="_blank"
              >
                Tx id: {truncateAddressString(buyPlayer.txId)}
              </a>
            ) : null}
          </Box>
        </Box>

        <PlayerCardLiteOwner />
        {/*<Box direction="column" gap="15px" align="center">*/}
        {/*  <Text>Your address:</Text>*/}
        {/*  <Box className={styles.addressBlock}>*/}
        {/*    <a href={EXPLORER_URL + `/address/${user.address}`} target="_blank">*/}
        {/*      {truncateAddressString(user.address)}*/}
        {/*    </a>*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </Box>
      {/*<Box*/}
      {/*  className={styles.description}*/}
      {/*  margin={{ bottom: 'medium' }}*/}
      {/*  justify="center"*/}
      {/*  align="center"*/}
      {/*>*/}
      {/*  <Text size="medium" color="black">*/}
      {/*    Receive 13% reward if someone buys your player smart contract and 2%*/}
      {/*    is allocated in the mint account for service and maintenance*/}
      {/*  </Text>*/}
      {/*</Box>*/}
    </Box>
  );
});
