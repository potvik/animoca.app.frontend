import * as React from 'react';
import {Box} from 'grommet';
import {Loader} from 'components/Base';
import {BaseContainer, PageContainer} from 'components';
import {TokenCard} from './TokenCard';
import {useStores} from 'stores';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {SignIn} from '../../components/SignIn';
import {useMediaQuery} from 'react-responsive';
// import { PLAYERS_FILTER } from '../../stores/SoccerPlayersList';

export const PlayersMarketplace = observer(() => {
  const {tokenList, user, actionModals, routing} = useStores();

  useEffect(() => {
    // soccerPlayers.setMaxDisplay(20);
    if (!user.isAuthorized && user.status === 'success') {
      actionModals.open(SignIn, {
        title: 'Sign in',
        applyText: 'Sign in',
        closeText: 'Cancel',
        noValidation: true,
        width: '500px',
        showOther: true,
        onApply: (data: any) => user.signIn(data.email, data.walletType),
        onClose: () => {
          if (!user.isAuthorized) {
            routing.push('/');
          }
        },
      });
    } else {
      if (tokenList.list.length === 0) {
        tokenList.getList();
      }
    }
  }, [user.status]);

  const isSmallMobile = useMediaQuery({query: '(max-width: 600px)'});

  return (
    <BaseContainer>
      <Box
        direction="row"
        align="center"
        justify="center"
        style={{color: 'black', fontWeight: 'bold'}}
        margin={{vertical: '30px'}}>
        {tokenList.totalSets > 0 && <>{tokenList.totalSets} {tokenList.totalSets === 1 ? 'set' : 'sets'}</>}
      </Box>

      <PageContainer>
        {/*<Box*/}
        {/*  direction="row"*/}
        {/*  justify="end"*/}
        {/*  align="center"*/}
        {/*  margin={{ vertical: '30px' }}*/}
        {/*>*/}
        {/*  <Box gap="20px" direction="row" align="end">*/}
        {/*    <Title*/}
        {/*      size="small"*/}
        {/*      color="white"*/}
        {/*      style={{*/}
        {/*        boxShadow: 'box-shadow: 0 0 20px rgba(0,0,0,0.4)',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      sort by*/}
        {/*    </Title>*/}
        {/*    <Select*/}
        {/*      size="medium"*/}
        {/*      onChange={soccerPlayers.setSort}*/}
        {/*      value={soccerPlayers.sort}*/}
        {/*      options={[*/}
        {/*        {*/}
        {/*          text: 'high price',*/}
        {/*          value: 'highPrice',*/}
        {/*        },*/}
        {/*        {*/}
        {/*          text: 'low price',*/}
        {/*          value: 'lowPrice',*/}
        {/*        },*/}
        {/*        {*/}
        {/*          text: 'card number',*/}
        {/*          value: 'internalPlayerId',*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*</Box>*/}

        {tokenList.status === 'first_fetching' ? (
          <Loader />
        ) : (
          <Box
            direction="row"
            justify={
              tokenList.filteredList.length < 10 || isSmallMobile
                ? 'center'
                : 'between'
            }
            align="center"
            wrap
            gap={tokenList.filteredList.length < 10 ? '20px' : '10x'}
            style={{minHeight: 600}}
          >

            {tokenList.filteredList.map((item, idx) => (
              <TokenCard
                key={item.id}
                data={item}
                // onEnterViewport={() => {
                //   if (idx + 10 > soccerPlayers.maxDisplay) {
                //     soccerPlayers.setMaxDisplay(soccerPlayers.maxDisplay + 20);
                //     return;
                //   }
                // }}
              />
            ))}
          </Box>
        )}
      </PageContainer>
    </BaseContainer>
  );
});
