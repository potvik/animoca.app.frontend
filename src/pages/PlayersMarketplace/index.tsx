import * as React from 'react';
import { Box } from 'grommet';
import { Loader } from 'components/Base';
import { BaseContainer, PageContainer } from 'components';
import { TokenCard } from './TokenCard';
import { useStores } from 'stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
// import { PLAYERS_FILTER } from '../../stores/SoccerPlayersList';

export const PlayersMarketplace = observer(() => {
  const { tokenList, user } = useStores();

  useEffect(() => {
    // soccerPlayers.setMaxDisplay(20);

    if (tokenList.list.length === 0) {
      tokenList.getList();
    }
  }, []);

  return (
    <BaseContainer>
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
            justify={tokenList.filteredList.length < 10 ? 'center' : 'between'}
            align="center"
            wrap
            gap={tokenList.filteredList.length < 10 ? '20px' : '10x'}
            style={{ minHeight: 600 }}
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
