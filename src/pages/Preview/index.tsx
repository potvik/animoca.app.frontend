import * as React from 'react';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../stores';
import {useEffect} from 'react';
import {Box} from 'grommet';
import {Title} from '../../components/Base/components/Title';
import {TokenCard} from '../PlayersMarketplace/TokenCard';
import {TwitterShareButton} from 'react-twitter-embed';

export const Preview = observer(() => {
  const {actionModals, routing, tokenList} = useStores();

  useEffect(() => {
    if (tokenList.hasNewCards) {
      let scale = 'scale(0.8)',
        width = '1000px';

      if (tokenList.newCardsList.length === 1) {
        width = '600px';
        scale = 'scale(1)';
      }

      if (tokenList.newCardsList.length > 3) {
        width = '1100px';
        scale = 'scale(0.7)';
      }

      actionModals.open(
        () => (
          <Box pad={{vertical: 'large', horizontal: 'small'}}>
            <Title style={{textAlign: 'center'}}>
              You got {tokenList.newCardsList.length} new{' '}
              {tokenList.newCardsList.length === 1 ? 'card' : 'cards'}
            </Title>
            <Box
              direction="row"
              justify="center"
              align="start"
              wrap
              gap={tokenList.newCardsList.length < 10 ? '20px' : '10x'}
              style={{
                minHeight: 300,
                height: 'auto',
                // transform: 'scale(0.9)',
              }}
              margin={{top: 'large'}}
            >
              {tokenList.newCardsList.map((item, idx) => (
                <TokenCard
                  style={{transform: scale, marginBottom: '5px'}}
                  key={item.id}
                  data={item}
                />
              ))}
            </Box>

            <Box
              direction="row"
              justify="center"
            >
              Congratulations on completing your purchase!
              Share this on social media for a chance to win 10 chests!
            </Box>
            <Box
              direction="row"
              justify="center"
            >
              <TwitterShareButton
                url={'http://bquh.io'}
                size='large'
                options={{text: `I just bought ${tokenList.newCardsList.length || ''} @animocabrands #BeastQuest NFT chests on @harmonyprotocol! Join in for your chance to win 10,000 $ONE in staking rewards 🎉🥳👇 \n#HarmonyNFTs #animoca #blockchain #gaming #NFT`,
                  via: undefined, size: 'large'}}
              />
            </Box>
          </Box>
        ),
        {
          title: 'Sign in',
          applyText: 'Show all my cards',
          closeText: 'Cancel',
          noValidation: true,
          width,
          showOther: true,
          onApply: () => {
            routing.push('/my-cards');
            return Promise.resolve();
          },
          onClose: () => {
            tokenList.clearNewCards();
          },
        },
      );
    }
  }, [tokenList.hasNewCards]);

  return <></>;
});
